"use strict";var G=Object.defineProperty;var K=(n,e,t)=>e in n?G(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var a=(n,e,t)=>(K(n,typeof e!="symbol"?e+"":e,t),t);Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const i=require("vue");class c{static typeChecker(e){return{}.toString.call(e)}static isString(e){return typeof e=="string"}static isArray(e){return this.typeChecker(e)==="[object Array]"}static isFunction(e){return this.typeChecker(e)==="[object Function]"}static isPromise(e){return e instanceof Promise}static isObject(e){return this.typeChecker(e)==="[object Object]"}static isAsyncFunction(e){return this.typeChecker(e)==="[object AsyncFunction]"}static isUndefined(e){return e===void 0}static isArrayEmpty(e){return(e==null?void 0:e.length)<1}static isObjectEmpty(e){return this.isArrayEmpty(Object.keys(e))}static isListSchema(e){return e.type==="list"}static isGroupSchema(e){return e.type==="group"}static isItemSchema(e){return this.isUndefined(e.type)||e.type==="item"}static isProcessInprogress(e){if(e===void 0)return!0;if(this.isObject(e)){if(e.setup&&this.isFunction(e.setup)&&e.props)return!1;if(this.isObjectEmpty(e))return!0;for(const t in e)if(e.hasOwnProperty(t)&&this.isProcessInprogress(e[t]))return!0}else if(this.isArray(e)){if(this.isArrayEmpty(e))return!0;for(const t of e)if(this.isProcessInprogress(t))return!0}return!1}}function p(n,...e){return e.forEach(t=>{if(Array.isArray(t))Array.isArray(n)||(n=[]),t.forEach((s,r)=>{typeof s=="object"&&s!==null?n[r]=p(Array.isArray(s)?[]:{},s):n[r]=s});else for(let s in t)t.hasOwnProperty(s)&&(typeof t[s]=="object"&&t[s]!==null?n[s]=p(n[s]||{},t[s]):n[s]=t[s])}),n}function b(n){const e=new WeakMap;function t(s){if(s===null||typeof s!="object")return s;if(s instanceof Date)return new Date(s);if(s instanceof RegExp)return new RegExp(s);if(s instanceof Map){const o=new Map;for(let[l,u]of s)o.set(t(l),t(u));return o}if(s instanceof Set){const o=new Set;for(let l of s)o.add(t(l));return o}if(e.has(s))return e.get(s);if(Array.isArray(s)){const o=[];e.set(s,o);for(let l=0;l<s.length;l++)o[l]=t(s[l]);return o}const r=Object.create(Object.getPrototypeOf(s));e.set(s,r);for(let o in s)s.hasOwnProperty(o)&&(r[o]=t(s[o]));return r}return t(n)}function O(n,e){return n.replace(/undefined/g,e)}class W{constructor(e){a(this,"runtimeCore");this.formCustomization=e}cleanFallbackFields(e){return e!==null&&typeof e=="object"&&(delete e.__yiwwhl_async_field_fallback,Object.values(e).forEach(t=>{this.cleanFallbackFields(t)})),e}setup(e){return this.runtimeCore=e,Object.assign(this.runtimeCore.native,this.formCustomization.native),Object.assign(this.runtimeCore.gridProps,this.formCustomization.gridProps),Object.assign(this.runtimeCore.runtimeSetters,this.formCustomization.runtimeSetters),this.formCustomization}submit(){return new Promise((e,t)=>{this.runtimeCore.formRef.value.validate(s=>s?t(s):e(this.cleanFallbackFields(i.toRaw(this.runtimeCore.processor.processedModel.value))))})}hydrate(e){if(!this.runtimeCore)return Promise.reject({code:"0002",message:"hydrate 使用时机错误，建议将 hydrate 操作放到 onMounted 等页面节点挂载完成的钩子中，或者使用响应式的值来注入数据"});this.runtimeCore.hydrateEffect.trackEffect(()=>{i.isRef(e)?i.watch(()=>e.value,()=>{p(this.runtimeCore.model.value,e.value)},{deep:!0,immediate:!0}):i.isReactive(e)?i.watch(()=>e,()=>{p(this.runtimeCore.model.value,e)},{deep:!0,immediate:!0}):p(this.runtimeCore.model.value,e)},{lazy:!0})}}class N{constructor(){a(this,"effects",new Set)}clearEffects(){this.effects.clear()}triggerEffects(){Array.from(this.effects).forEach(e=>e())}trackEffect(e,t={lazy:!1}){return!t.lazy&&e(),this.effects.add(e),()=>this.effects.delete(e)}}class H{constructor(e){a(this,"runtimeCore");a(this,"processedSchemas");a(this,"processedModel");a(this,"getRuntimeMeta");a(this,"stableSchemas",[]);a(this,"stableModel",{});a(this,"schemaPreset",E.schemaPreset);a(this,"componentPropsPreset",E.componentPropsPreset);a(this,"stableUpdaterProcessProgress");a(this,"stableUpdaterTimes",0);a(this,"schemaEffect",new N);a(this,"defaultValueEffect",new N);a(this,"defaultValueInprogressMap",new Map);a(this,"baseDefaultValueFunctionsLength");this.runtimeCore=e,this.processedSchemas=e.schemas,this.processedModel=e.model,this.getRuntimeMeta=e.getRuntimeMeta.bind(e),i.watch(()=>this.processedModel.value,()=>{this.schemaEffect.triggerEffects()},{deep:!0})}parse(e,t){e.forEach((s,r)=>{this.parseItem(s,r,t)})}initSchemas(e){return e.map(t=>{const s={};return t.children&&(s.children=this.initSchemas(t.children)),s})}countFunctionDefaultValues(e){let t=0,s=new Set;function r(o){if(!s.has(o)&&(Array.isArray(o)||o!==null&&typeof o=="object")){s.add(o);for(let l in o)o.hasOwnProperty(l)&&(l==="defaultValue"&&typeof o[l]=="function"&&!o[l].toString().includes("[native code]")&&t++,r(o[l]))}}return r(e),t}parseSchemas(e,t){c.isArrayEmpty(this.processedSchemas.value)&&(this.baseDefaultValueFunctionsLength=this.countFunctionDefaultValues(b(e)),this.processedSchemas.value=this.initSchemas(e)),this.parse(e,t)}parseStable(e){const t={};if(!c.isUndefined(e.stable))t[e.key]=this.parseStable(e.stable);else return e;return t}stableUpdater(e=[]){if(e.every(Boolean)){const t=i.toRaw(this.processedSchemas.value);!c.isProcessInprogress(t)&&c.isObjectEmpty(this.stableModel)&&(this.stableUpdaterProcessProgress||(this.stableUpdaterProcessProgress=Array.from({length:t.length}).fill(!1)),this.stableUpdaterProcessProgress[this.stableUpdaterTimes]=!0,this.stableUpdaterTimes++,this.modelProcessor(t))}}parseItem(e,t,s){const r=this,o=Array.from({length:Object.keys(e).filter(u=>u!=="children").length}).fill(!1);this.objectParser({data:e,index:t,updater:l});function l(u){const f=u.index,d=u.key,I=u.keyIndex;if(c.isUndefined(u.stable))return;const w=r.parseStable(u.stable),j=s==null?void 0:s.index,P=s==null?void 0:s.key;let y=w;if(c.isProcessInprogress(y)||(o[I]=!0),s){let h=r.processedSchemas.value[j][P][f][d];h&&c.isObject(h)&&d!=="component"&&(y=p(h,y)),r.processedSchemas.value[j][P][f][d]=y,r.stableUpdater(o)}else{let h=r.processedSchemas.value[f][d];h&&c.isObject(h)&&d!=="component"&&(y=p(h,y)),r.processedSchemas.value[f][d]=y,r.stableUpdater(o)}}}objectParser(e){const t=e.data;Object.keys(t).forEach((r,o)=>{if(r==="children")this.parseSchemas(t[r],{...e,key:r,keyIndex:o});else{const l=u=>{e.updater({...e,key:r,keyIndex:o,stable:u})};c.isFunction(t[r])?r!=="defaultValue"?this.schemaEffect.trackEffect(()=>{if(r==="component"){const u=t[r](this.getRuntimeMeta());this.promiseFieldParser(u,l,!1)}else this.fieldParser(t[r],l)}):this.defaultValueEffect.trackEffect(()=>{const u=this.schemaEffect.trackEffect(()=>{/\{\s*model\s*\}/.test(t[r].toString())?this.fieldParser(t[r],f=>{if(!f)return l(f);this.defaultValueInprogressMap.set(t[r],f),!c.isProcessInprogress(f)&&this.defaultValueInprogressMap.size===this.baseDefaultValueFunctionsLength&&Array.from(this.defaultValueInprogressMap.values()).every(d=>!d.includes("undefined"))?(l(f),this.defaultValueEffect.clearEffects(),i.nextTick(()=>{u()})):l(f)}):this.fieldParser(t[r],f=>{this.defaultValueInprogressMap.set(t[r],f),!c.isProcessInprogress(f)&&this.defaultValueInprogressMap.size===this.baseDefaultValueFunctionsLength&&Array.from(this.defaultValueInprogressMap.values()).every(d=>!d.includes("undefined"))?(l(f),this.defaultValueEffect.clearEffects(),i.nextTick(()=>{u()})):l(f)})})}):r==="component"||r==="slots"||r==="runtimeSetters"?this.promiseFieldParser(t[r],l,!1):this.fieldParser(t[r],l)}})}promiseFieldParser(e,t,s){c.isPromise(e)?e.then(r=>{c.isString(r)&&(r=O(r,"")),s&&c.isObject(r)?this.objectParser({data:r,updater:t}):t(r)}):(c.isString(e)&&(e=O(e,"")),s&&c.isObject(e)?this.objectParser({data:e,updater:t}):t(e))}fieldParser(e,t,s=!0){if(c.isFunction(e))if(e.name.startsWith("__proform_raw_"))t((...r)=>{e({rawArgs:r,...this.getRuntimeMeta()})});else{const r=e(this.getRuntimeMeta());this.promiseFieldParser(r,t,s)}else i.isRef(e)?i.watch(()=>e.value,()=>{c.isUndefined(e.value)||(s&&c.isObject(e.value)?this.objectParser({data:e.value,updater:t}):t(e.value))},{immediate:!0,deep:!0}):i.isReactive(e)?i.watch(()=>e,()=>{c.isUndefined(e)||(s&&c.isObject(e)?this.objectParser({data:e,updater:t}):t(e))},{immediate:!0,deep:!0}):s&&c.isObject(e)?this.objectParser({data:e,updater:t}):t(e)}modelProcessor(e){e.map(t=>this.createModel(t,this.processedModel.value)),c.isObjectEmpty(this.stableModel)&&this.stableUpdaterProcessProgress.every(Boolean)&&this.defaultValueEffect.effects.size===0&&(this.stableModel=b(this.processedModel.value),this.runtimeCore.hydrateEffect.triggerEffects(),this.runtimeCore.hydrateEffect.clearEffects())}createModel(e,t){c.isListSchema(e)&&(t[e.field]||(t[e.field]=[{}]),e.children.forEach(s=>{this.createModel(s,t[e.field][0])})),c.isGroupSchema(e)&&e.children.forEach(s=>{this.createModel(s,t)}),c.isItemSchema(e)&&(t[e.field]=e.defaultValue)}}function J(n){return typeof n=="function"||Object.prototype.toString.call(n)==="[object Object]"&&!i.isVNode(n)}class Q{constructor(e){a(this,"schemas",i.ref([]));a(this,"model",i.ref({}));a(this,"processorBySchemaType",{item:this.runtimeItemProcessor.bind(this),group:this.runtimeGroupProcessor.bind(this),list:this.runtimeListProcessor.bind(this)});a(this,"formRef",i.ref(null));a(this,"hydrateEffect",new N);a(this,"native",i.reactive({}));a(this,"gridProps",{});a(this,"runtimeSetters",{});a(this,"globalNativeFormOverride",{props:{},slots:{}});this.setup=e,this.processor=new H(this);const t=this.setup(this);if(i.isRef(t.schemas)){const s=i.watch(()=>t.schemas,()=>{this.processor.parseSchemas(t.schemas.value),i.nextTick(()=>{s()})},{deep:!0})}else if(i.isReactive(t.schemas)){const s=i.watch(()=>t.schemas,()=>{this.processor.parseSchemas(t.schemas),i.nextTick(()=>{s()})},{deep:!0})}else this.processor.parseSchemas(t.schemas)}getRuntimeMeta(){return{model:i.toRaw(b(this.model.value))}}runtimeItemProcessor(e,t,s=this.model.value,r){var A,R,x,M,F,U,D,k,_,L,z,T,q,$,B;p(this.globalNativeFormOverride.props,(R=(A=e.native)==null?void 0:A.props)==null?void 0:R.Form),p(this.globalNativeFormOverride.slots,(M=(x=e.native)==null?void 0:x.slots)==null?void 0:M.Form);const o=p(b((U=(F=this.native)==null?void 0:F.props)==null?void 0:U.FormItem)??{},(k=(D=e.native)==null?void 0:D.props)==null?void 0:k.FormItem),l=p(b((L=(_=this.native)==null?void 0:_.slots)==null?void 0:L.FormItem)??{},(T=(z=e.native)==null?void 0:z.slots)==null?void 0:T.FormItem),u={display:"grid",gridColumn:"1 / -1",...e.gridProps},f=r?`${r.field}.${t}.${e.field}`:e.field,d=i.toRaw(e.component);if(!d)return;const I=d.name,w=e.componentProps??{},j=E.placeholderPresetByComponentName;let P=e.placeholder;const y=e.required;let h=e.show;h===void 0&&(h=!0),h||delete s[e.field];let v=e.label;const S=(r==null?void 0:r.runtimeSetters)??this.runtimeSetters;if(!c.isUndefined(t)&&!c.isObjectEmpty(S)&&(v=O((q=S==null?void 0:S.listItemLabelSetter)==null?void 0:q.call(S,e.label,t+1),""),P=`${j[I]??"请输入"}${v}`),P||(P=`${j[I]??"请输入"}${v}`),y)if(!e.rules)e.rules=[],($=e.rules)==null||$.push({required:!0,message:`${v}是必填项`});else{const m=e.rules.findIndex(C=>!c.isUndefined(C.required));m!==-1&&(e.rules[m].required=!0,e.rules[m].message=`${v}是必填项`)}else if(e.rules){const m=(B=e.rules)==null?void 0:B.findIndex(C=>!!C.required);m!==-1&&(e.rules[m].required=!1)}return i.createVNode("div",{style:u},[i.createVNode(g.runtimeDoms.Item,null,{default(){return i.withDirectives(i.createVNode(g.runtimeDoms.FormItem,i.mergeProps(o,{label:`${v}:`,rules:e.rules,field:f}),{default(){return i.createVNode(d,i.mergeProps({modelValue:s[e.field],"onUpdate:modelValue":m=>s[e.field]=m,placeholder:P},w),null)},...l}),[[i.vShow,h]])}})])}runtimeGroupProcessor(e){let t;const s={display:"grid",gridColumn:"1 / -1",...e.gridProps};return i.createVNode("div",{style:s},[i.createVNode(g.runtimeDoms.Group,{schema:e},J(t=e.children.map(r=>this.runtimeItemProcessor(r)))?t:{default:()=>[t]})])}addListItem(e){var t,s;if(!((t=this.processor.stableModel[e.field])!=null&&t[0]))return Promise.reject({code:"0001",message:"异步默认值数据正在处理中，请您耐心等待... "});(s=this.processor.stableModel[e.field])!=null&&s[0]&&this.model.value[e.field].push(b(this.processor.stableModel[e.field][0])),this.formRef.value.clearValidate()}deleteListItem(e,t){this.model.value[e.field].splice(t,1),this.formRef.value.clearValidate()}runtimeListProcessor(e){const t={display:"grid",gridColumn:"1 / -1",...e.gridProps},s=this;return s.model.value[e.field]||(s.model.value[e.field]=[{}]),i.createVNode("div",{style:t},[i.createVNode(g.runtimeDoms.List,{schema:e},{default(){return s.model.value[e.field].map((r,o)=>i.createVNode(g.runtimeDoms.ListItem,null,{default(){return e.children.map(l=>s.runtimeItemProcessor(l,o,r,e))},delete({container:l}={}){var f;let u=l??i.createVNode("button",null,null);return i.withDirectives(i.createVNode(u,{onClick:()=>s.deleteListItem(e,o)},null),[[i.vShow,((f=s.model.value[e.field])==null?void 0:f.length)>1]])}}))},add({container:r}={}){let o=r??i.createVNode("button",null,[i.createTextVNode("添加")]);return i.createVNode(o,{onClick:()=>s.addListItem(e)},null)}})])}runtimeProcessor(e){return e.map(t=>(t.type||(t.type="item"),this.processorBySchemaType[t.type](t)))}exec(){var o,l,u,f;const e={display:"grid",gridColumn:"1 / -1",gridAutoColumns:"1fr",...this.gridProps},t=this,s=p(b((l=(o=this.native)==null?void 0:o.props)==null?void 0:l.Form)??{},this.globalNativeFormOverride.props),r=p(b((f=(u=this.native)==null?void 0:u.slots)==null?void 0:f.Form)??{},this.globalNativeFormOverride.slots);return i.createVNode(g.runtimeDoms.Form,i.mergeProps(s,{ref:this.formRef,model:this.model.value}),{default(){return i.createVNode("div",{style:e},[t.runtimeProcessor(t.schemas.value)])},...r})}}class g{}a(g,"runtimeDoms");const V=class V{static getPlaceholderPrefixPresetByComponentName(){const e={请选择:["Select","Tree","TreeSelect"],请输入:["Input"]},t={};for(let s in e)e[s].forEach(r=>{t[r]=s});return t}};a(V,"schemaPreset",{type:{defaultValue:"item"},component:{defaultValue:void 0},componentProps:{defaultValue:void 0},defaultValue:{defaultValue:void 0},label:{defaultValue:""},field:{defaultValue:"__yiwwhl_async_field_fallback"},rules:{defaultValue:[]},show:{defaultValue:!0},required:{defaultValue:!1},placeholder:{defaultValue:void 0},children:{defaultValue:[]},native:void 0,gridProps:void 0}),a(V,"componentPropsPreset",{options:{defaultValue:[]}}),a(V,"placeholderPresetByComponentName",V.getPlaceholderPrefixPresetByComponentName());let E=V;const X=i.defineComponent({props:{setup:{type:Function,required:!0}},setup(n){const e=new Q(n.setup);return()=>e.exec()}});function Y(n){const e=new W(n);return[e.setup.bind(e),{submit:e.submit.bind(e),hydrate:e.hydrate.bind(e)}]}function Z(n){return{install(){g.runtimeDoms=n}}}function ee(n,e){return e==="raw"&&Object.defineProperty(n,"name",{value:`__proform_raw_${n.name}`,writable:!0}),n}exports.ProForm=X;exports.useForm=Y;exports.useFormRenderer=Z;exports.useModifiers=ee;
