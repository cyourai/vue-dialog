/* eslint-disable */
'use strict';

var getBusinessObject = require('bpmn-js/lib/util/ModelUtil').getBusinessObject,
  is = require('bpmn-js/lib/util/ModelUtil').is;

var entryFactory = require('bpmn-js-properties-panel/lib/factory/EntryFactory');

var callable = require('./Callable');

var cmdHelper = require('bpmn-js-properties-panel/lib/helper/CmdHelper');

var flattenDeep = require('lodash/flattenDeep');
var assign = require('lodash/assign');

function getCallableType(element) {
  var bo = getBusinessObject(element);

  var boCalledElement = bo.get('calledElement'),
    boCaseRef = bo.get('camunda:caseRef');

  var callActivityType = '';
  if (typeof boCalledElement !== 'undefined') {
    callActivityType = 'bpmn';
  } else

  if (typeof boCaseRef !== 'undefined') {
    callActivityType = 'cmmn';
  }

  return callActivityType;
}

var DEFAULT_PROPS = {
  calledElement: '',
  'camunda:calledElementBinding': 'latest',
  'camunda:calledElementVersion': undefined,
  'camunda:calledElementTenantId': undefined,
  'camunda:variableMappingClass': undefined,
  'camunda:variableMappingDelegateExpression': undefined,
  'camunda:caseRef': undefined,
  'camunda:caseBinding': 'latest',
  'camunda:caseVersion': undefined,
  'camunda:caseTenantId': undefined
};

module.exports = function (group, element, bpmnFactory, translate) {

  if (!is(element, 'camunda:CallActivity')) {
    return;
  }

  // 自定义调用子流程类型,限定BPMN
  group.entries.push(entryFactory.selectBox({
    id: 'callActivity',
    label: translate('CallActivity Type'),
    selectOptions: [{
        name: 'BPMN',
        value: 'bpmn'
      }
      // { name: 'CMMN', value: 'cmmn' }
    ],
    emptyParameter: false,
    modelProperty: 'callActivityType',

    get: function (element, node) {
      return {
        // callActivityType: 'bpmn'
        callActivityType: getCallableType(element)
      };
    },

    set: function (element, values, node) {
      var type = values.callActivityType;

      var props = assign({}, DEFAULT_PROPS);

      if (type === 'bpmn') {
        props.calledElement = '可通过绑定子流程按钮进行操作';
      } else if (type === 'cmmn') {
        props['camunda:caseRef'] = '';
      }
      // console.debug(element)
      // console.debug(props)
      return cmdHelper.updateProperties(element, props);
    }

  }));

  group.entries.push(callable(element, bpmnFactory, {
    getCallableType: getCallableType
  }, translate));

  group.entries = flattenDeep(group.entries);
};
