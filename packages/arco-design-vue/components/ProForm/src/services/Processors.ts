import { Ref, watchEffect, isRef, isReactive, watch } from "vue";
import {
  AnyObject,
  Schema,
  ItemSchema,
  ProxyedSchema,
  AnyFunction,
} from "../types";
import { IS, deepClone } from "../utils";
import { Effect } from "../services";

export default class Processors {
  rawSchemas: ProxyedSchema[] = [];
  rawModel: AnyObject = {};
  schemaDefaultValueWhenAsync: Record<keyof ItemSchema, any> = {
    type: "item",
    component: undefined,
    componentProps: undefined,
    defaultValue: undefined,
    label: "",
    field: "warn_no_field",
    rules: [],
  };
  componentPropsDefaultValueWhenAsync: AnyObject = {
    options: [],
  };
  uniqueEffectMap: any = {};
  schemaEffect = new Effect();
  modelEffect = new Effect();

  constructor(
    public processedSchemas: Ref<Schema[]>,
    public processedModel: Ref<AnyObject>
  ) {
    watch(
      () => this.processedModel.value,
      () => {
        this.schemaEffect.triggerEffects();
        this.modelEffect.triggerEffects();
      },
      {
        deep: true,
      }
    );
  }

  schemaAnalyzer(
    schemas: ProxyedSchema[],
    baseSchema = this.processedSchemas.value,
    baseRawSchema = this.rawSchemas,
    parentField?: string,
    schemaIndex?: number
  ) {
    for (let i = 0; i < schemas.length; i++) {
      let schema = schemas[i];
      this.schemaProcessor(
        schema,
        i,
        (processedSchema, forceUpdate) => {
          baseSchema[i] = processedSchema;
          this.modelProcessor(
            processedSchema,
            parentField && this.processedModel.value[parentField][0]
          );
          if (!baseRawSchema[i] || forceUpdate) {
            baseRawSchema[i] = deepClone(processedSchema);
          }
        },
        schemaIndex,
        parentField
      );
    }
  }

  schemaProcessor(
    schema: ProxyedSchema,
    index: number,
    setter: AnyFunction,
    schemaIndex?: number,
    parentField?: string
  ) {
    const processed: AnyObject = {};
    const that = this;

    function updateSchema(forceUpdate = false) {
      if (processed.componentProps) {
        const processedProps = {};
        that.propsProcessor(
          processed.componentProps,
          that.componentPropsDefaultValueWhenAsync,
          processedProps,
          (_forceUpdate) => {
            processed.componentProps = processedProps;
            setter({ ...processed }, _forceUpdate);
          },
          index,
          schemaIndex
        );
        return;
      }

      if (processed.children) {
        that.processedSchemas.value[index] = processed as Schema;
        that.rawSchemas[index] = processed as Schema;
        setter({ ...processed }, forceUpdate);
        that.schemaAnalyzer(
          processed.children,
          // @ts-expect-error 此处已经守卫为非 ItemSchema
          that.processedSchemas.value[index]?.children,
          // @ts-expect-error 此处已经守卫为非 ItemSchema
          that.rawSchemas[index]?.children,
          processed.field,
          index
        );
        return;
      }

      setter({ ...processed }, forceUpdate);
    }

    this.propsProcessor<ProxyedSchema>(
      schema,
      this.schemaDefaultValueWhenAsync,
      processed,
      updateSchema,
      index,
      schemaIndex,
      parentField
    );
  }

  patchSchema() {}

  patchModel() {}

  propsProcessor<T extends object = any>(
    pendingProcess: T,
    schemaDefaultValueWhenAsync: Record<keyof T, any>,
    processed: AnyObject,
    update: AnyFunction,
    schemaIndexOrChildrenIndex: number,
    schemaIndex?: number,
    parentField?: string
  ) {
    const pendingProcessKeys = Object.keys(pendingProcess) as (keyof T)[];
    const progress = Array.from({
      length: pendingProcessKeys.length,
    }).fill(false);

    function isProgressDone() {
      return progress.every((p) => p);
    }

    for (let i = 0; i < pendingProcessKeys.length; i++) {
      const pendingProcessKey = pendingProcessKeys[i];
      const propertyValue = pendingProcess[pendingProcessKey];

      if (IS.isFunction(propertyValue)) {
        const fnExecRes = propertyValue({
          model: this.processedModel.value,
        });
        if (pendingProcessKey !== "defaultValue") {
          this.schemaEffect.trackEffect(() => {
            const effectRes = propertyValue({
              model: this.processedModel.value,
            });
            if (effectRes instanceof Promise) {
              effectRes.then((res) => {
                if (schemaIndex === undefined) {
                  // @ts-expect-error
                  this.processedSchemas.value[schemaIndexOrChildrenIndex][
                    pendingProcessKey
                  ] = res;
                } else {
                  // @ts-expect-error
                  this.processedSchemas.value[schemaIndex].children[
                    schemaIndexOrChildrenIndex
                  ][pendingProcessKey] = res;
                }
              });
            } else {
              if (schemaIndex === undefined) {
                // @ts-expect-error
                this.processedSchemas.value[schemaIndexOrChildrenIndex][
                  pendingProcessKey
                ] = effectRes;
              } else {
                // @ts-expect-error
                this.processedSchemas.value[schemaIndex].children[
                  schemaIndexOrChildrenIndex
                ][pendingProcessKey] = effectRes;
              }
            }
          });
        } else {
          this.modelEffect.trackEffect(() => {
            const effectRes = propertyValue({
              model: this.processedModel.value,
            });
            if (effectRes instanceof Promise) {
              effectRes.then((res) => {
                // TODO: 后续重构，此处的 parentField === undefined 是用来区分 list 和 group 的
                if (
                  schemaIndexOrChildrenIndex === undefined ||
                  parentField === undefined
                ) {
                  // @ts-expect-error
                  this.processedModel.value[pendingProcess.field] = res;
                } else {
                  this.processedModel.value[parentField][
                    schemaIndexOrChildrenIndex
                    // @ts-expect-error
                  ][pendingProcess.field] = res;
                }
                this.modelEffect.clearEffects();
              });
            } else {
              // @ts-expect-error
              this.processedModel.value[pendingProcess.field] = effectRes;
              // TODO: 后续重构，此处的 parentField === undefined 是用来区分 list 和 group 的
              if (
                schemaIndexOrChildrenIndex === undefined ||
                parentField === undefined
              ) {
                // @ts-expect-error
                this.processedModel.value[pendingProcess.field] = effectRes;
              } else {
                this.processedModel.value[parentField][
                  schemaIndexOrChildrenIndex
                  // @ts-expect-error
                ][pendingProcess.field] = effectRes;
              }
              this.modelEffect.clearEffects();
            }
          });
        }

        if (fnExecRes instanceof Promise) {
          progress[i] = true;
          processed[pendingProcessKey] =
            schemaDefaultValueWhenAsync[pendingProcessKey];
          isProgressDone() && update();
          fnExecRes.then((res) => {
            progress[i] = true;
            processed[pendingProcessKey] = res;
            isProgressDone() && update(true);
          });
        } else {
          progress[i] = true;
          processed[pendingProcessKey] = fnExecRes;
          isProgressDone() && update();
        }
      } else {
        progress[i] = true;
        if (isRef(propertyValue)) {
          watch(
            () => propertyValue.value,
            (val) => {
              processed[pendingProcessKey] = val;
              isProgressDone() && update();
            },
            {
              immediate: true,
              deep: true,
            }
          );
          watchEffect(() => {});
        } else if (isReactive(propertyValue)) {
          watch(
            () => propertyValue,
            (val) => {
              processed[pendingProcessKey] = val;
              isProgressDone() && update();
            },
            {
              immediate: true,
              deep: true,
            }
          );
        } else {
          processed[pendingProcessKey] = propertyValue;
          isProgressDone() && update();
        }
      }
    }
  }

  modelProcessor(schema: ProxyedSchema, baseModel = this.processedModel.value) {
    if (IS.isListSchema(schema)) {
      if (!baseModel[schema.field]) {
        baseModel[schema.field] = [{}];
      }
      schema.children.forEach((childSchema) => {
        this.modelProcessor(childSchema, baseModel[schema.field][0]);
      });
      return;
    }
    if (IS.isGroupSchema(schema)) {
      schema.children.forEach((childSchema) => {
        this.modelProcessor(childSchema, baseModel);
      });
      return;
    }
    if (IS.isItemSchema(schema)) {
      baseModel[schema.field] = schema.defaultValue;
    }
  }
}
