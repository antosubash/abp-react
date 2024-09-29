"use strict";(self.webpackChunkabp_react=self.webpackChunkabp_react||[]).push([[737],{5680:(e,t,r)=>{r.d(t,{xA:()=>i,yg:()=>m});var n=r(6540);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function u(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var s=n.createContext({}),c=function(e){var t=n.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):l(l({},t),e)),r},i=function(e){var t=c(e.components);return n.createElement(s.Provider,{value:t},e.children)},p="mdxType",g={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},b=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,s=e.parentName,i=u(e,["components","mdxType","originalType","parentName"]),p=c(r),b=a,m=p["".concat(s,".").concat(b)]||p[b]||g[b]||o;return r?n.createElement(m,l(l({ref:t},i),{},{components:r})):n.createElement(m,l({ref:t},i))}));function m(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,l=new Array(o);l[0]=b;var u={};for(var s in t)hasOwnProperty.call(t,s)&&(u[s]=t[s]);u.originalType=e,u[p]="string"==typeof e?e:a,l[1]=u;for(var c=2;c<o;c++)l[c]=r[c];return n.createElement.apply(null,l)}return n.createElement.apply(null,r)}b.displayName="MDXCreateElement"},6792:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>s,contentTitle:()=>l,default:()=>g,frontMatter:()=>o,metadata:()=>u,toc:()=>c});var n=r(8168),a=(r(6540),r(5680));const o={slug:"welcome",title:"Welcome",authors:["slorber","yangshun"],tags:["facebook","hello","docusaurus"]},l=void 0,u={permalink:"/abp-react/blog/welcome",source:"@site/blog/2021-08-26-welcome/index.md",title:"Welcome",description:"Docusaurus blogging features are powered by the blog plugin.",date:"2021-08-26T00:00:00.000Z",formattedDate:"August 26, 2021",tags:[{label:"facebook",permalink:"/abp-react/blog/tags/facebook"},{label:"hello",permalink:"/abp-react/blog/tags/hello"},{label:"docusaurus",permalink:"/abp-react/blog/tags/docusaurus"}],readingTime:.405,hasTruncateMarker:!1,authors:[{name:"S\xe9bastien Lorber",title:"Docusaurus maintainer",url:"https://sebastienlorber.com",imageURL:"https://github.com/slorber.png",key:"slorber"},{name:"Yangshun Tay",title:"Front End Engineer @ Facebook",url:"https://github.com/yangshun",imageURL:"https://github.com/yangshun.png",key:"yangshun"}],frontMatter:{slug:"welcome",title:"Welcome",authors:["slorber","yangshun"],tags:["facebook","hello","docusaurus"]},nextItem:{title:"MDX Blog Post",permalink:"/abp-react/blog/mdx-blog-post"}},s={authorsImageUrls:[void 0,void 0]},c=[],i={toc:c},p="wrapper";function g(e){let{components:t,...o}=e;return(0,a.yg)(p,(0,n.A)({},i,o,{components:t,mdxType:"MDXLayout"}),(0,a.yg)("p",null,(0,a.yg)("a",{parentName:"p",href:"https://docusaurus.io/docs/blog"},"Docusaurus blogging features")," are powered by the ",(0,a.yg)("a",{parentName:"p",href:"https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-content-blog"},"blog plugin"),"."),(0,a.yg)("p",null,"Simply add Markdown files (or folders) to the ",(0,a.yg)("inlineCode",{parentName:"p"},"blog")," directory."),(0,a.yg)("p",null,"Regular blog authors can be added to ",(0,a.yg)("inlineCode",{parentName:"p"},"authors.yml"),"."),(0,a.yg)("p",null,"The blog post date can be extracted from filenames, such as:"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("inlineCode",{parentName:"li"},"2019-05-30-welcome.md")),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("inlineCode",{parentName:"li"},"2019-05-30-welcome/index.md"))),(0,a.yg)("p",null,"A blog post folder can be convenient to co-locate blog post images:"),(0,a.yg)("p",null,(0,a.yg)("img",{alt:"Docusaurus Plushie",src:r(1475).A,width:"1500",height:"500"})),(0,a.yg)("p",null,"The blog supports tags as well!"),(0,a.yg)("p",null,(0,a.yg)("strong",{parentName:"p"},"And if you don't want a blog"),": just delete this directory, and use ",(0,a.yg)("inlineCode",{parentName:"p"},"blog: false")," in your Docusaurus config."))}g.isMDXComponent=!0},1475:(e,t,r)=>{r.d(t,{A:()=>n});const n=r.p+"assets/images/docusaurus-plushie-banner-a60f7593abca1e3eef26a9afa244e4fb.jpeg"}}]);