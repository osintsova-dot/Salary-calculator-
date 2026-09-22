// Presentation adapter. public/engine.js is an exact copy of the original calculation script.
export function prepareLegacy(){
 const content=document.querySelector('.legacy-content');
 if(content.dataset.prepared)return;content.dataset.prepared='true';
 const teachers=document.getElementById('teachersContainer');
 const fixed=teachers.nextElementSibling?.classList.contains('section-heading')?teachers.nextElementSibling.nextElementSibling:teachers.nextElementSibling;
 if(fixed){fixed.dataset.section='payments';fixed.id='fixed-payments';fixed.querySelector('#adminTotal')?.closest('.fx-row')?.classList.add('administrator-row');fixed.querySelector('.administrator-row')?.parentElement.classList.add('fixed-payment-rows');fixed.querySelector('[data-key=adminMin]')?.setAttribute('aria-label','Изменить минимум администратора');fixed.querySelector('.administrator-row .btn-slip')?.setAttribute('aria-label','Квиток администратора');}
 const children=[...content.children];let afterTeachers=false;
 children.forEach(el=>{if(el===teachers){afterTeachers=true;return}if(afterTeachers&&el!==fixed&&el.classList.contains('admin-block'))el.dataset.section=el.querySelector('#premiumTeachersBlock')?'premium':'reserves';if(el.classList.contains('deposit-block'))el.dataset.section='reserves'});
 const heading=content.querySelector('.section-heading');if(heading)heading.dataset.section='payments';
 document.getElementById('familyLink').dataset.section='reserves';
 const summary=content.querySelector('.summary-grid');
 const details=document.createElement('details');details.className='full-summary';details.open=true;details.dataset.section='payments';
 const title=document.createElement('summary');title.textContent='Все показатели и пояснения к расчёту';summary.before(details);details.append(title,summary);
 const potential=document.getElementById('potentialBanner');potential.dataset.section='payments';
 const improveTables=()=>{teachers.querySelectorAll('.teacher-block').forEach((block,index)=>{
  const table=block.querySelector('table');if(table&&!table.parentElement.classList.contains('table-scroll')){const wrap=document.createElement('div');wrap.className='table-scroll';wrap.tabIndex=0;wrap.setAttribute('role','region');wrap.setAttribute('aria-label',`Группы: ${block.querySelector('.teacher-name').textContent}`);table.before(wrap);wrap.append(table)}
  block.querySelectorAll('tbody tr').forEach(row=>{const group=row.querySelector('.group-name')?.textContent.trim();if(!group)return;row.querySelector('input[type=number]')?.setAttribute('aria-label',`Количество учеников: ${group}`);row.querySelectorAll('.counter button').forEach((b,i)=>b.setAttribute('aria-label',`${i?'Добавить':'Убрать'} ученика: ${group}`))});
  const name=block.querySelector('.teacher-name')?.textContent;block.querySelector('.btn-slip')?.setAttribute('aria-label',`Квиток: ${name}`);block.dataset.teacher=index;
 });};
 improveTables();new MutationObserver(improveTables).observe(teachers,{childList:true});
 const premium=document.getElementById('premiumTeachersBlock');
 const labelPremium=()=>premium.querySelectorAll('input[type=checkbox]').forEach(el=>el.setAttribute('aria-label',el.parentElement.textContent.trim()));
 labelPremium();new MutationObserver(labelPremium).observe(premium,{childList:true});
 document.querySelectorAll('.modal-overlay input:not([aria-label])').forEach(el=>{if(el.placeholder)el.setAttribute('aria-label',el.placeholder)});
 // Accessible keyboard trapping and return focus for the original calculation dialogs.
 let previous=null,active=null;
 const observer=new MutationObserver(()=>{const open=document.querySelector('.modal-overlay.open');if(open&&open!==active){previous=document.activeElement;active=open;open.setAttribute('role','dialog');open.setAttribute('aria-modal','true');open.setAttribute('aria-label',({historyModal:'История расчётов',bigbenModal:'Импорт из BigBen',analysisModal:'Анализ',slipModal:'Расчётный лист'})[open.id]||'Расчёт');open.querySelector('button,input,a')?.focus()}else if(!open&&active){active=null;previous?.focus()}});
 document.querySelectorAll('.modal-overlay').forEach(el=>observer.observe(el,{attributes:true,attributeFilter:['class']}));
 document.addEventListener('keydown',e=>{if(!active)return;if(e.key==='Escape'){active.classList.remove('open');return}if(e.key==='Tab'){const nodes=[...active.querySelectorAll('button,input,select,textarea,a[href],[tabindex="0"]')].filter(el=>!el.disabled&&el.getClientRects().length);const first=nodes[0],last=nodes.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last?.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first?.focus()}}});
}
