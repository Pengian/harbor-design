"use strict";var I=Object.defineProperty;var O=(o,e,t)=>e in o?I(o,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):o[e]=t;var c=(o,e,t)=>(O(o,typeof e!="symbol"?e+"":e,t),t);Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const n=require("vue");class f{static typeChecker(e){return{}.toString.call(e)}static isString(e){return typeof e=="string"}static isArray(e){return this.typeChecker(e)==="[object Array]"}static isFunction(e){return this.typeChecker(e)==="[object Function]"}static isPromise(e){return e instanceof Promise}static isObject(e){return this.typeChecker(e)==="[object Object]"}static isAsyncFunction(e){return this.typeChecker(e)==="[object AsyncFunction]"}static isUndefined(e){return e===void 0}static isArrayEmpty(e){return(e==null?void 0:e.length)<1}static isObjectEmpty(e){return this.isArrayEmpty(Object.keys(e))}static isListSchema(e){return e.type==="list"}static isGroupSchema(e){return e.type==="group"}static isItemSchema(e){return this.isUndefined(e.type)||e.type==="item"}static isProcessInprogress(e){if(e===void 0)return!0;if(this.isObject(e)){if(e.setup&&this.isFunction(e.setup)&&e.props)return!1;if(this.isObjectEmpty(e))return!0;for(const t in e)if(e.hasOwnProperty(t)&&this.isProcessInprogress(e[t]))return!0}else if(this.isArray(e)){if(this.isArrayEmpty(e))return!0;for(const t of e)if(this.isProcessInprogress(t))return!0}return!1}}function S(o,...e){return e.forEach(t=>{for(let s in t)t.hasOwnProperty(s)&&(typeof t[s]=="object"&&t[s]!==null?(o[s]=o[s]||{},S(o[s],t[s])):o[s]=t[s])}),o}function E(o){const e=new WeakMap;function t(s){if(s===null||typeof s!="object")return s;if(s instanceof Date)return new Date(s);if(s instanceof RegExp)return new RegExp(s);if(s instanceof Map){const i=new Map;for(let[l,a]of s)i.set(t(l),t(a));return i}if(s instanceof Set){const i=new Set;for(let l of s)i.add(t(l));return i}if(e.has(s))return e.get(s);if(Array.isArray(s)){const i=[];e.set(s,i);for(let l=0;l<s.length;l++)i[l]=t(s[l]);return i}const r=Object.create(Object.getPrototypeOf(s));e.set(s,r);for(let i in s)s.hasOwnProperty(i)&&(r[i]=t(s[i]));return r}return t(o)}class C{constructor(e){c(this,"runtimeCore");this.formCustomization=e}cleanFallbackFields(e){return e!==null&&typeof e=="object"&&(delete e.__yiwwhl_async_field_fallback,Object.values(e).forEach(t=>{this.cleanFallbackFields(t)})),e}setup(e){return this.runtimeCore=e,this.formCustomization}submit(){return new Promise((e,t)=>{this.runtimeCore.formRef.value.validate(s=>s?t(s):e(this.cleanFallbackFields(n.toRaw(this.runtimeCore.processor.processedModel.value))))})}hydrate(e){this.runtimeCore.hydrateEffect.trackEffect(()=>{n.isRef(e)?n.watch(()=>e.value,()=>{S(this.runtimeCore.model.value,e.value)},{deep:!0,immediate:!0}):n.isReactive(e)?n.watch(()=>e,()=>{S(this.runtimeCore.model.value,e)},{deep:!0,immediate:!0}):S(this.runtimeCore.model.value,e)},{lazy:!0})}}class j{constructor(){c(this,"effects",new Set)}clearEffects(){this.effects.clear()}triggerEffects(){Array.from(this.effects).forEach(e=>e())}trackEffect(e,t={lazy:!1}){return!t.lazy&&e(),this.effects.add(e),()=>this.effects.delete(e)}}class R{constructor(e){c(this,"runtimeCore");c(this,"processedSchemas");c(this,"processedModel");c(this,"getRuntimeMeta");c(this,"stableSchemas",[]);c(this,"stableModel",{});c(this,"schemaPreset",V.schemaPreset);c(this,"componentPropsPreset",V.componentPropsPreset);c(this,"stableUpdaterProcessProgress");c(this,"stableUpdaterTimes",0);c(this,"schemaEffect",new j);c(this,"defaultValueEffect",new j);c(this,"defaultValueInprogressMap",new Map);c(this,"baseDefaultValueFunctionsLength");this.runtimeCore=e,this.processedSchemas=e.schemas,this.processedModel=e.model,this.getRuntimeMeta=e.getRuntimeMeta.bind(e),n.watch(()=>this.processedModel.value,()=>{this.schemaEffect.triggerEffects()},{deep:!0})}parse(e,t){e.forEach((s,r)=>{this.parseItem(s,r,t)})}initSchemas(e){return e.map(t=>{const s={};return t.children&&(s.children=this.initSchemas(t.children)),s})}countFunctionDefaultValues(e){let t=0,s=new Set;function r(i){if(!s.has(i)&&(Array.isArray(i)||i!==null&&typeof i=="object")){s.add(i);for(let l in i)i.hasOwnProperty(l)&&(l==="defaultValue"&&typeof i[l]=="function"&&!i[l].toString().includes("[native code]")&&t++,r(i[l]))}}return r(e),t}parseSchemas(e,t){f.isArrayEmpty(this.processedSchemas.value)&&(this.baseDefaultValueFunctionsLength=this.countFunctionDefaultValues(E(e)),this.processedSchemas.value=this.initSchemas(e)),this.parse(e,t)}parseStable(e){const t={};if(!f.isUndefined(e.stable))t[e.key]=this.parseStable(e.stable);else return e;return t}stableUpdater(e=[]){if(e.every(Boolean)){const t=n.toRaw(this.processedSchemas.value);!f.isProcessInprogress(t)&&f.isObjectEmpty(this.stableModel)&&(this.stableUpdaterProcessProgress||(this.stableUpdaterProcessProgress=Array.from({length:t.length}).fill(!1)),this.stableUpdaterProcessProgress[this.stableUpdaterTimes]=!0,this.stableUpdaterTimes++,this.modelProcessor(t))}}parseItem(e,t,s){const r=this,i=Array.from({length:Object.keys(e).filter(a=>a!=="children").length}).fill(!1);this.objectParser({data:e,index:t,updater:l});function l(a){const u=a.index,h=a.key,P=a.keyIndex;if(!a.stable)return;const v=r.parseStable(a.stable),y=s==null?void 0:s.index,g=s==null?void 0:s.key;let d=v;if(f.isProcessInprogress(d)||(i[P]=!0),s){let p=r.processedSchemas.value[y][g][u][h];p&&f.isObject(p)&&h!=="component"&&(d=Object.assign(p,d)),r.processedSchemas.value[y][g][u][h]=d,r.stableUpdater(i)}else{let p=r.processedSchemas.value[u][h];p&&f.isObject(p)&&(d=Object.assign(p,d)),r.processedSchemas.value[u][h]=d,r.stableUpdater(i)}}}objectParser(e){const t=e.data;Object.keys(t).forEach((r,i)=>{if(r==="children")this.parseSchemas(t[r],{...e,key:r,keyIndex:i});else{const l=a=>{e.updater({...e,key:r,keyIndex:i,stable:a})};if(f.isFunction(t[r]))r!=="defaultValue"?this.schemaEffect.trackEffect(()=>{if(r==="component"){const a=t[r](this.getRuntimeMeta());this.promiseFieldParser(a,l,!1)}else this.fieldParser(t[r],l)}):this.defaultValueEffect.trackEffect(()=>{const a=this.schemaEffect.trackEffect(()=>{/\{\s*model\s*\}/.test(t[r].toString())?this.fieldParser(t[r],u=>{if(!u)return l(u);this.defaultValueInprogressMap.set(t[r],u),!f.isProcessInprogress(u)&&this.defaultValueInprogressMap.size===this.baseDefaultValueFunctionsLength&&Array.from(this.defaultValueInprogressMap.values()).every(h=>!h.includes("undefined"))?(l(u),this.defaultValueEffect.clearEffects(),n.nextTick(()=>{a()})):l(u)}):this.fieldParser(t[r],u=>{this.defaultValueInprogressMap.set(t[r],u),!f.isProcessInprogress(u)&&this.defaultValueInprogressMap.size===this.baseDefaultValueFunctionsLength&&Array.from(this.defaultValueInprogressMap.values()).every(h=>!h.includes("undefined"))?(l(u),this.defaultValueEffect.clearEffects(),n.nextTick(()=>{a()})):l(u)})})});else if(r==="component"){const a=t[r];this.promiseFieldParser(a,l,!1)}else this.fieldParser(t[r],l)}})}replaceUndefinedInString(e,t){return e.replace(/undefined/g,t)}promiseFieldParser(e,t,s){f.isPromise(e)?e.then(r=>{s&&f.isObject(r)?this.objectParser({data:r,updater:t}):t(r)}):(f.isString(e)&&(e=this.replaceUndefinedInString(e,"")),s&&f.isObject(e)?this.objectParser({data:e,updater:t}):t(e))}fieldParser(e,t,s=!0){if(f.isFunction(e))if(e.name.startsWith("__proform_raw_"))t(e);else{const r=e(this.getRuntimeMeta());this.promiseFieldParser(r,t,s)}else n.isRef(e)?n.watch(()=>e.value,()=>{f.isUndefined(e.value)||(s&&f.isObject(e.value)?this.objectParser({data:e.value,updater:t}):t(e.value))},{immediate:!0,deep:!0}):n.isReactive(e)?n.watch(()=>e,()=>{f.isUndefined(e)||(s&&f.isObject(e)?this.objectParser({data:e,updater:t}):t(e))},{immediate:!0,deep:!0}):s&&f.isObject(e)?this.objectParser({data:e,updater:t}):t(e)}modelProcessor(e){e.map(t=>this.createModel(t,this.processedModel.value)),f.isObjectEmpty(this.stableModel)&&this.stableUpdaterProcessProgress.every(Boolean)&&this.defaultValueEffect.effects.size===0&&(this.stableModel=E(this.processedModel.value),this.runtimeCore.hydrateEffect.triggerEffects(),this.runtimeCore.hydrateEffect.clearEffects())}createModel(e,t){f.isListSchema(e)&&(t[e.field]||(t[e.field]=[{}]),e.children.forEach(s=>{this.createModel(s,t[e.field][0])})),f.isGroupSchema(e)&&e.children.forEach(s=>{this.createModel(s,t)}),f.isItemSchema(e)&&(t[e.field]=e.defaultValue)}}function w(o){return typeof o=="function"||Object.prototype.toString.call(o)==="[object Object]"&&!n.isVNode(o)}class M{constructor(e){c(this,"schemas",n.ref([]));c(this,"model",n.ref({}));c(this,"processorBySchemaType",{item:this.runtimeItemProcessor.bind(this),group:this.runtimeGroupProcessor.bind(this),list:this.runtimeListProcessor.bind(this)});c(this,"formRef",n.ref(null));c(this,"hydrateEffect",new j);this.setup=e,this.processor=new R(this);const t=this.setup(this);this.processor.parseSchemas(t.schemas)}getRuntimeMeta(){return{model:n.toRaw(E(this.model.value))}}runtimeItemProcessor(e,t,s=this.model.value,r){var g;const i=r?`${r.field}.${t}.${e.field}`:e.field,l=n.toRaw(e.component);if(!l)return;const a=l.name,u=e.componentProps??{},h=V.placeholderPresetByComponentName;let P=e.placeholder;if(P||(P=`${h[a]??"请输入"}${e.label}`),e.required)if(!e.rules)e.rules=[],(g=e.rules)==null||g.push({required:!0,message:`${e.label}是必填项`});else{const d=e.rules.findIndex(p=>!!p.required);e.rules[d].message=`${e.label}是必填项`}let y=e.show;return y===void 0&&(y=!0),y||delete s[e.field],n.createVNode(m.runtimeDoms.Item,null,{default(){return n.withDirectives(n.createVNode(m.runtimeDoms.FormItem,{label:`${e.label}:`,rules:e.rules,field:i},{default:()=>[n.createVNode(l,n.mergeProps({modelValue:s[e.field],"onUpdate:modelValue":d=>s[e.field]=d,placeholder:P},u),null)]}),[[n.vShow,y]])}})}runtimeGroupProcessor(e){let t;return n.createVNode(m.runtimeDoms.Group,{schema:e},w(t=e.children.map(s=>this.runtimeItemProcessor(s)))?t:{default:()=>[t]})}addListItem(e){var t,s;if(!((t=this.processor.stableModel[e.field])!=null&&t[0]))return Promise.reject({code:"0001",message:"异步默认值数据正在处理中，请您耐心等待... "});(s=this.processor.stableModel[e.field])!=null&&s[0]&&this.model.value[e.field].push(E(this.processor.stableModel[e.field][0])),this.formRef.value.clearValidate()}deleteListItem(e,t){this.model.value[e.field].splice(t,1),this.formRef.value.clearValidate()}runtimeListProcessor(e){const t=this;return t.model.value[e.field]||(t.model.value[e.field]=[{}]),n.createVNode(m.runtimeDoms.List,{schema:e},{default(){return t.model.value[e.field].map((s,r)=>n.createVNode(m.runtimeDoms.ListItem,null,{default(){return e.children.map(i=>t.runtimeItemProcessor(i,r,s,e))},delete({container:i}={}){var a;let l=i??n.createVNode("button",null,null);return n.withDirectives(n.createVNode(l,{onClick:()=>t.deleteListItem(e,r)},null),[[n.vShow,((a=t.model.value[e.field])==null?void 0:a.length)>1]])}}))},add({container:s}={}){let r=s??n.createVNode("button",null,[n.createTextVNode("添加")]);return n.createVNode(r,{onClick:()=>t.addListItem(e)},null)}})}runtimeProcessor(e){return e.map(t=>(t.type||(t.type="item"),this.processorBySchemaType[t.type](t)))}exec(){let e;return n.createVNode(m.runtimeDoms.Form,{ref:this.formRef,model:this.model.value},w(e=this.runtimeProcessor(this.schemas.value))?e:{default:()=>[e]})}}class m{}c(m,"runtimeDoms");const b=class b{static getPlaceholderPrefixPresetByComponentName(){const e={请选择:["Select","Tree","TreeSelect"],请输入:["Input"]},t={};for(let s in e)e[s].forEach(r=>{t[r]=s});return t}};c(b,"schemaPreset",{type:{defaultValue:"item"},component:{defaultValue:void 0},componentProps:{defaultValue:void 0},defaultValue:{defaultValue:void 0},label:{defaultValue:""},field:{defaultValue:"__yiwwhl_async_field_fallback"},rules:{defaultValue:[]},show:{defaultValue:!0},required:{defaultValue:!1},placeholder:{defaultValue:void 0},children:{defaultValue:[]}}),c(b,"componentPropsPreset",{options:{defaultValue:[]}}),c(b,"placeholderPresetByComponentName",b.getPlaceholderPrefixPresetByComponentName());let V=b;const x=n.defineComponent({props:{setup:{type:Function,required:!0}},setup(o){const e=new M(o.setup);return()=>e.exec()}});function A(o){const e=new C(o);return[e.setup.bind(e),{submit:e.submit.bind(e),hydrate:e.hydrate.bind(e)}]}function D(o){return{install(){m.runtimeDoms=o}}}function N(o,e){return e==="raw"&&Object.defineProperty(o,"name",{value:`__proform_raw_${o.name}`,writable:!0}),o}exports.ProForm=x;exports.useForm=A;exports.useFormRenderer=D;exports.useModifiers=N;
