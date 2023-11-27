"use strict";var I=Object.defineProperty;var O=(n,e,t)=>e in n?I(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var c=(n,e,t)=>(O(n,typeof e!="symbol"?e+"":e,t),t);Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const o=require("vue");class a{static typeChecker(e){return{}.toString.call(e)}static isArray(e){return this.typeChecker(e)==="[object Array]"}static isFunction(e){return this.typeChecker(e)==="[object Function]"}static isPromise(e){return e instanceof Promise}static isObject(e){return this.typeChecker(e)==="[object Object]"}static isAsyncFunction(e){return this.typeChecker(e)==="[object AsyncFunction]"}static isUndefined(e){return e===void 0}static isArrayEmpty(e){return(e==null?void 0:e.length)<1}static isObjectEmpty(e){return this.isArrayEmpty(Object.keys(e))}static isListSchema(e){return e.type==="list"}static isGroupSchema(e){return e.type==="group"}static isItemSchema(e){return this.isUndefined(e.type)||e.type==="item"}static isProcessInprogress(e){if(e===void 0)return!0;if(this.isObject(e)){if(e.setup&&this.isFunction(e.setup)&&e.props)return!1;if(this.isObjectEmpty(e))return!0;for(const t in e)if(e.hasOwnProperty(t)&&this.isProcessInprogress(e[t]))return!0}else if(this.isArray(e)){if(this.isArrayEmpty(e))return!0;for(const t of e)if(this.isProcessInprogress(t))return!0}return!1}}function E(n,...e){return e.forEach(t=>{for(let s in t)t.hasOwnProperty(s)&&(typeof t[s]=="object"&&t[s]!==null?(n[s]=n[s]||{},E(n[s],t[s])):n[s]=t[s])}),n}function S(n){const e=new WeakMap;function t(s){if(s===null||typeof s!="object")return s;if(s instanceof Date)return new Date(s);if(s instanceof RegExp)return new RegExp(s);if(s instanceof Map){const i=new Map;for(let[l,f]of s)i.set(t(l),t(f));return i}if(s instanceof Set){const i=new Set;for(let l of s)i.add(t(l));return i}if(e.has(s))return e.get(s);if(Array.isArray(s)){const i=[];e.set(s,i);for(let l=0;l<s.length;l++)i[l]=t(s[l]);return i}const r=Object.create(Object.getPrototypeOf(s));e.set(s,r);for(let i in s)s.hasOwnProperty(i)&&(r[i]=t(s[i]));return r}return t(n)}class C{constructor(e){c(this,"runtimeCore");this.formCustomization=e}cleanFallbackFields(e){return e!==null&&typeof e=="object"&&(delete e.__yiwwhl_async_field_fallback,Object.values(e).forEach(t=>{this.cleanFallbackFields(t)})),e}setup(e){return this.runtimeCore=e,this.formCustomization}submit(){return new Promise((e,t)=>{this.runtimeCore.formRef.value.validate(s=>s?t(s):e(this.cleanFallbackFields(o.toRaw(this.runtimeCore.processor.processedModel.value))))})}hydrate(e){this.runtimeCore.hydrateEffect.trackEffect(()=>{o.isRef(e)?o.watch(()=>e.value,()=>{E(this.runtimeCore.model.value,e.value)},{deep:!0,immediate:!0}):o.isReactive(e)?o.watch(()=>e,()=>{E(this.runtimeCore.model.value,e)},{deep:!0,immediate:!0}):E(this.runtimeCore.model.value,e)},{lazy:!0})}}class j{constructor(){c(this,"effects",new Set)}clearEffects(){this.effects.clear()}triggerEffects(){Array.from(this.effects).forEach(e=>e())}trackEffect(e,t={lazy:!1}){return!t.lazy&&e(),this.effects.add(e),()=>this.effects.delete(e)}}class M{constructor(e){c(this,"runtimeCore");c(this,"processedSchemas");c(this,"processedModel");c(this,"getRuntimeMeta");c(this,"stableSchemas",[]);c(this,"stableModel",{});c(this,"schemaPreset",V.schemaPreset);c(this,"componentPropsPreset",V.componentPropsPreset);c(this,"stableUpdaterProcessProgress");c(this,"stableUpdaterTimes",0);c(this,"schemaEffect",new j);c(this,"defaultValueEffect",new j);c(this,"defaultValueInprogressMap",new Map);c(this,"baseDefaultValueFunctionsLength");this.runtimeCore=e,this.processedSchemas=e.schemas,this.processedModel=e.model,this.getRuntimeMeta=e.getRuntimeMeta.bind(e),o.watch(()=>this.processedModel.value,()=>{this.schemaEffect.triggerEffects()},{deep:!0})}parse(e,t){e.forEach((s,r)=>{this.parseItem(s,r,t)})}initSchemas(e){return e.map(t=>{const s={};return t.children&&(s.children=this.initSchemas(t.children)),s})}countFunctionDefaultValues(e){let t=0,s=new Set;function r(i){if(!s.has(i)&&(Array.isArray(i)||i!==null&&typeof i=="object")){s.add(i);for(let l in i)i.hasOwnProperty(l)&&(l==="defaultValue"&&typeof i[l]=="function"&&!i[l].toString().includes("[native code]")&&t++,r(i[l]))}}return r(e),t}parseSchemas(e,t){a.isArrayEmpty(this.processedSchemas.value)&&(this.baseDefaultValueFunctionsLength=this.countFunctionDefaultValues(S(e)),this.processedSchemas.value=this.initSchemas(e)),this.parse(e,t)}parseStable(e){const t={};if(!a.isUndefined(e.stable))t[e.key]=this.parseStable(e.stable);else return e;return t}stableUpdater(e=[]){if(e.every(Boolean)){const t=o.toRaw(this.processedSchemas.value);!a.isProcessInprogress(t)&&a.isObjectEmpty(this.stableModel)&&(this.stableUpdaterProcessProgress||(this.stableUpdaterProcessProgress=Array.from({length:t.length}).fill(!1)),this.stableUpdaterProcessProgress[this.stableUpdaterTimes]=!0,this.stableUpdaterTimes++,this.modelProcessor(t))}}parseItem(e,t,s){const r=this,i=Array.from({length:Object.keys(e).filter(f=>f!=="children").length}).fill(!1);this.objectParser({data:e,index:t,updater:l});function l(f){const u=f.index,h=f.key,P=f.keyIndex;if(!f.stable)return;const w=r.parseStable(f.stable),b=s==null?void 0:s.index,g=s==null?void 0:s.key;let d=w;if(a.isProcessInprogress(d)||(i[P]=!0),s){let p=r.processedSchemas.value[b][g][u][h];p&&a.isObject(p)&&h!=="component"&&(d=Object.assign(p,d)),r.processedSchemas.value[b][g][u][h]=d,r.stableUpdater(i)}else{let p=r.processedSchemas.value[u][h];p&&a.isObject(p)&&(d=Object.assign(p,d)),r.processedSchemas.value[u][h]=d,r.stableUpdater(i)}}}objectParser(e){const t=e.data;Object.keys(t).forEach((r,i)=>{if(r==="children")this.parseSchemas(t[r],{...e,key:r,keyIndex:i});else{const l=f=>{e.updater({...e,key:r,keyIndex:i,stable:f})};if(a.isFunction(t[r]))r!=="defaultValue"?this.schemaEffect.trackEffect(()=>{if(r==="component"){const f=t[r](this.getRuntimeMeta());this.promiseFieldParser(f,l,!1)}else this.fieldParser(t[r],l)}):this.defaultValueEffect.trackEffect(()=>{const f=this.schemaEffect.trackEffect(()=>{/\{\s*model\s*\}/.test(t[r].toString())?this.fieldParser(t[r],u=>{if(!u)return l(u);this.defaultValueInprogressMap.set(t[r],u),!a.isProcessInprogress(u)&&this.defaultValueInprogressMap.size===this.baseDefaultValueFunctionsLength&&Array.from(this.defaultValueInprogressMap.values()).every(h=>!h.includes("undefined"))?(l(u),this.defaultValueEffect.clearEffects(),f()):l(u)}):this.fieldParser(t[r],u=>{this.defaultValueInprogressMap.set(t[r],u),!a.isProcessInprogress(u)&&this.defaultValueInprogressMap.size===this.baseDefaultValueFunctionsLength&&Array.from(this.defaultValueInprogressMap.values()).every(h=>!h.includes("undefined"))?(l(u),this.defaultValueEffect.clearEffects(),f()):l(u)})})});else if(r==="component"){const f=t[r];this.promiseFieldParser(f,l,!1)}else this.fieldParser(t[r],l)}})}promiseFieldParser(e,t,s){a.isPromise(e)?e.then(r=>{s&&a.isObject(r)?this.objectParser({data:r,updater:t}):t(r)}):s&&a.isObject(e)?this.objectParser({data:e,updater:t}):t(e)}fieldParser(e,t,s=!0){if(a.isFunction(e))if(e.name.startsWith("__proform_raw_"))t(e);else{const r=e(this.getRuntimeMeta());this.promiseFieldParser(r,t,s)}else o.isRef(e)?o.watch(()=>e.value,()=>{a.isUndefined(e.value)||(s&&a.isObject(e.value)?this.objectParser({data:e.value,updater:t}):t(e.value))},{immediate:!0,deep:!0}):o.isReactive(e)?o.watch(()=>e,()=>{a.isUndefined(e)||(s&&a.isObject(e)?this.objectParser({data:e,updater:t}):t(e))},{immediate:!0,deep:!0}):s&&a.isObject(e)?this.objectParser({data:e,updater:t}):t(e)}modelProcessor(e){e.map(t=>this.createModel(t,this.processedModel.value)),a.isObjectEmpty(this.stableModel)&&this.stableUpdaterProcessProgress.every(Boolean)&&this.defaultValueEffect.effects.size===0&&(this.stableModel=S(this.processedModel.value),this.runtimeCore.hydrateEffect.triggerEffects(),this.runtimeCore.hydrateEffect.clearEffects())}createModel(e,t){a.isListSchema(e)&&(t[e.field]||(t[e.field]=[{}]),e.children.forEach(s=>{this.createModel(s,t[e.field][0])})),a.isGroupSchema(e)&&e.children.forEach(s=>{this.createModel(s,t)}),a.isItemSchema(e)&&(t[e.field]=e.defaultValue)}}function v(n){return typeof n=="function"||Object.prototype.toString.call(n)==="[object Object]"&&!o.isVNode(n)}class R{constructor(e){c(this,"schemas",o.ref([]));c(this,"model",o.ref({}));c(this,"processorBySchemaType",{item:this.runtimeItemProcessor.bind(this),group:this.runtimeGroupProcessor.bind(this),list:this.runtimeListProcessor.bind(this)});c(this,"formRef",o.ref(null));c(this,"hydrateEffect",new j);this.setup=e,this.processor=new M(this);const t=this.setup(this);this.processor.parseSchemas(t.schemas)}getRuntimeMeta(){return{model:o.toRaw(S(this.model.value))}}runtimeItemProcessor(e,t,s=this.model.value,r){var g;const i=r?`${r.field}.${t}.${e.field}`:e.field,l=o.toRaw(e.component);if(!l)return;const f=l.name,u=e.componentProps??{},h=V.placeholderPresetByComponentName;let P=e.placeholder;if(P||(P=`${h[f]??"请输入"}${e.label}`),e.required)if(!e.rules)e.rules=[],(g=e.rules)==null||g.push({required:!0,message:`${e.label}是必填项`});else{const d=e.rules.findIndex(p=>!!p.required);e.rules[d].message=`${e.label}是必填项`}let b=e.show;return b===void 0&&(b=!0),b||delete s[e.field],o.createVNode(m.runtimeDoms.Item,null,{default(){return o.withDirectives(o.createVNode(m.runtimeDoms.FormItem,{label:`${e.label}:`,rules:e.rules,field:i},{default:()=>[o.createVNode(l,o.mergeProps({modelValue:s[e.field],"onUpdate:modelValue":d=>s[e.field]=d,placeholder:P},u),null)]}),[[o.vShow,b]])}})}runtimeGroupProcessor(e){let t;return o.createVNode(m.runtimeDoms.Group,{schema:e},v(t=e.children.map(s=>this.runtimeItemProcessor(s)))?t:{default:()=>[t]})}addListItem(e){var t,s;if(!((t=this.processor.stableModel[e.field])!=null&&t[0]))return Promise.reject({code:"0001",message:"异步默认值数据正在处理中，请您耐心等待... "});(s=this.processor.stableModel[e.field])!=null&&s[0]&&this.model.value[e.field].push(S(this.processor.stableModel[e.field][0]))}deleteListItem(e,t){this.model.value[e.field].splice(t,1);const s=e.children.map(({field:r})=>`${e.field}.${t}.${r}`);this.formRef.value.clearValidate(s)}runtimeListProcessor(e){const t=this;return t.model.value[e.field]||(t.model.value[e.field]=[{}]),o.createVNode(m.runtimeDoms.List,{schema:e},{default(){return t.model.value[e.field].map((s,r)=>o.createVNode(m.runtimeDoms.ListItem,null,{default(){return e.children.map(i=>t.runtimeItemProcessor(i,r,s,e))},delete({container:i}={}){var f;let l=i??o.createVNode("button",null,null);return o.withDirectives(o.createVNode(l,{onClick:()=>t.deleteListItem(e,r)},null),[[o.vShow,((f=t.model.value[e.field])==null?void 0:f.length)>1]])}}))},add({container:s}={}){let r=s??o.createVNode("button",null,[o.createTextVNode("添加")]);return o.createVNode(r,{onClick:()=>t.addListItem(e)},null)}})}runtimeProcessor(e){return e.map(t=>(t.type||(t.type="item"),this.processorBySchemaType[t.type](t)))}exec(){let e;return o.createVNode(m.runtimeDoms.Form,{ref:this.formRef,model:this.model.value},v(e=this.runtimeProcessor(this.schemas.value))?e:{default:()=>[e]})}}class m{}c(m,"runtimeDoms");const y=class y{static getPlaceholderPrefixPresetByComponentName(){const e={请选择:["Select","Tree","TreeSelect"],请输入:["Input"]},t={};for(let s in e)e[s].forEach(r=>{t[r]=s});return t}};c(y,"schemaPreset",{type:{defaultValue:"item"},component:{defaultValue:void 0},componentProps:{defaultValue:void 0},defaultValue:{defaultValue:void 0},label:{defaultValue:""},field:{defaultValue:"__yiwwhl_async_field_fallback"},rules:{defaultValue:[]},show:{defaultValue:!0},required:{defaultValue:!1},placeholder:{defaultValue:void 0},children:{defaultValue:[]}}),c(y,"componentPropsPreset",{options:{defaultValue:[]}}),c(y,"placeholderPresetByComponentName",y.getPlaceholderPrefixPresetByComponentName());let V=y;const A=o.defineComponent({props:{setup:{type:Function,required:!0}},setup(n){const e=new R(n.setup);return()=>e.exec()}});function D(n){const e=new C(n);return[e.setup.bind(e),{submit:e.submit.bind(e),hydrate:e.hydrate.bind(e)}]}function N(n){return{install(){m.runtimeDoms=n}}}function x(n,e){return e==="raw"&&Object.defineProperty(n,"name",{value:`__proform_raw_${n.name}`,writable:!0}),n}exports.ProForm=A;exports.useForm=D;exports.useFormRenderer=N;exports.useModifiers=x;
