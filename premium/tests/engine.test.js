import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
const engine=readFileSync(new URL('../public/engine.js',import.meta.url),'utf8');
// Раньше ядро лежало прямо в index.html; после редизайна оно вынесено в engine.js,
// поэтому сверяем исходник с тем файлом, который реально уходит на сайт.
const published=readFileSync(new URL('../../engine.js',import.meta.url),'utf8');
test('Published engine matches the source file',()=>assert.equal(engine,published));
const calc=engine.slice(engine.indexOf('function calcGroup('),engine.indexOf('// «За какой месяц»'));
function calculate(overrides={}){const context={GROUPS:[{dur:60}],state:{pupils:{0:4}},TARIFF:{60:8000,90:10000},TEACHER_PCT:.25,DEPOSIT:2500,isActive:()=>true,monthCrm:()=>null,noShowGroup:()=>0,transferAdjGroup:()=>0,earlyGroup:()=>0,abonDiscGroup:()=>0,...overrides};vm.createContext(context);return JSON.parse(JSON.stringify(vm.runInContext(calc+';calcGroup(0)',context)))}
test('60-minute group: revenue, payroll, deposit and take-home',()=>assert.deepEqual(calculate(),{revenue:32000,fot:8000,hands:5500,deposit:2500}));
test('Inactive group contributes no payroll or deposit',()=>assert.deepEqual(calculate({isActive:()=>false}),{revenue:0,fot:0,hands:0,deposit:0}));
test('CRM amount uses discounts and transfer corrections, not tariff headcount',()=>assert.deepEqual(calculate({monthCrm:()=>({0:40000}),noShowGroup:()=>2000,transferAdjGroup:()=>500,earlyGroup:()=>1000,abonDiscGroup:()=>1200}),{revenue:36300,fot:9075,hands:6575,deposit:2500}));
test('Take-home never becomes negative',()=>assert.equal(calculate({state:{pupils:{0:1}}}).hands,0));
