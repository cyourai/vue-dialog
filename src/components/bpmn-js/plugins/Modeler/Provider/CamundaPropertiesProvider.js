/* eslint-disable */
'use strict'
const inherits = require('inherits')

const PropertiesActivator = require('bpmn-js-properties-panel/lib/PropertiesActivator')

let asyncCapableHelper = require('bpmn-js-properties-panel/lib/helper/AsyncCapableHelper'),
  ImplementationTypeHelper = require('bpmn-js-properties-panel/lib/helper/ImplementationTypeHelper')

const is = require('bpmn-js/lib/util/ModelUtil').is

// bpmn properties
let processProps = require('bpmn-js-properties-panel/lib/provider/bpmn/parts/ProcessProps'),
  eventProps = require('bpmn-js-properties-panel/lib/provider/bpmn/parts/EventProps'),
  linkProps = require('bpmn-js-properties-panel/lib/provider/bpmn/parts/LinkProps'),
  documentationProps = require('bpmn-js-properties-panel/lib/provider/bpmn/parts/DocumentationProps'),
  idProps = require('bpmn-js-properties-panel/lib/provider/bpmn/parts/IdProps'),
  nameProps = require('bpmn-js-properties-panel/lib/provider/bpmn/parts/NameProps'),
  executableProps = require('bpmn-js-properties-panel/lib/provider/bpmn/parts/ExecutableProps')

// camunda properties
let serviceTaskDelegateProps = require('bpmn-js-properties-panel/lib/provider/camunda/parts/ServiceTaskDelegateProps'),
  // 自定义面板
  userTaskProps = require('./Props/UserTaskProps'),
  callActivityProps = require('./Props/CallActivityProps'),
  conditionalProps = require('./Props/ConditionalProps'),
  asynchronousContinuationProps = require('bpmn-js-properties-panel/lib/provider/camunda/parts/AsynchronousContinuationProps'),
  multiInstanceProps = require('bpmn-js-properties-panel/lib/provider/camunda/parts/MultiInstanceLoopProps'),
  scriptProps = require('bpmn-js-properties-panel/lib/provider/camunda/parts/ScriptTaskProps'),
  formProps = require('bpmn-js-properties-panel/lib/provider/camunda/parts/FormProps'),
  startEventInitiator = require('bpmn-js-properties-panel/lib/provider/camunda/parts/StartEventInitiator'),
  variableMapping = require('bpmn-js-properties-panel/lib/provider/camunda/parts/VariableMappingProps'),
  versionTag = require('bpmn-js-properties-panel/lib/provider/camunda/parts/VersionTagProps')

let listenerProps = require('bpmn-js-properties-panel/lib/provider/camunda/parts/ListenerProps'),
  listenerDetails = require('bpmn-js-properties-panel/lib/provider/camunda/parts/ListenerDetailProps'),
  listenerFields = require('bpmn-js-properties-panel/lib/provider/camunda/parts/ListenerFieldInjectionProps')

let elementTemplateChooserProps = require('bpmn-js-properties-panel/lib/provider/camunda/element-templates/parts/ChooserProps'),
  elementTemplateCustomProps = require('bpmn-js-properties-panel/lib/provider/camunda/element-templates/parts/CustomProps')

// Input/Output
let inputOutput = require('bpmn-js-properties-panel/lib/provider/camunda/parts/InputOutputProps'),
  inputOutputParameter = require('bpmn-js-properties-panel/lib/provider/camunda/parts/InputOutputParameterProps')

// Connector
let connectorDetails = require('bpmn-js-properties-panel/lib/provider/camunda/parts/ConnectorDetailProps'),
  connectorInputOutput = require('bpmn-js-properties-panel/lib/provider/camunda/parts/ConnectorInputOutputProps'),
  connectorInputOutputParameter = require('bpmn-js-properties-panel/lib/provider/camunda/parts/ConnectorInputOutputParameterProps')

// properties
const properties = require('bpmn-js-properties-panel/lib/provider/camunda/parts/PropertiesProps')

// job configuration
const jobConfiguration = require('bpmn-js-properties-panel/lib/provider/camunda/parts/JobConfigurationProps')

// history time to live
const historyTimeToLive = require('bpmn-js-properties-panel/lib/provider/camunda/parts/HistoryTimeToLiveProps')

// candidate starter groups/users
const candidateStarter = require('bpmn-js-properties-panel/lib/provider/camunda/parts/CandidateStarterProps')

// external task configuration
const externalTaskConfiguration = require('bpmn-js-properties-panel/lib/provider/camunda/parts/ExternalTaskConfigurationProps')

// field injection
const fieldInjections = require('bpmn-js-properties-panel/lib/provider/camunda/parts/FieldInjectionProps')

let getBusinessObject = require('bpmn-js/lib/util/ModelUtil').getBusinessObject,
  eventDefinitionHelper = require('bpmn-js-properties-panel/lib/helper/EventDefinitionHelper'),
  implementationTypeHelper = require('bpmn-js-properties-panel/lib/helper/ImplementationTypeHelper')

// helpers ////////////////////////////////////////

const isExternalTaskPriorityEnabled = function(element) {
  const businessObject = getBusinessObject(element)

  // show only if element is a process, a participant ...
  if (is(element, 'bpmn:Process') || is(element, 'bpmn:Participant') && businessObject.get('processRef')) {
    return true
  }

  let externalBo = ImplementationTypeHelper.getServiceTaskLikeBusinessObject(element),
    isExternalTask = ImplementationTypeHelper.getImplementationType(externalBo) === 'external'

  // ... or an external task with selected external implementation type
  return !!ImplementationTypeHelper.isExternalCapable(externalBo) && isExternalTask
}

const isJobConfigEnabled = function(element) {
  const businessObject = getBusinessObject(element)

  if (is(element, 'bpmn:Process') || is(element, 'bpmn:Participant') && businessObject.get('processRef')) {
    return true
  }

  // async behavior
  const bo = getBusinessObject(element)
  if (asyncCapableHelper.isAsyncBefore(bo) || asyncCapableHelper.isAsyncAfter(bo)) {
    return true
  }

  // timer definition
  if (is(element, 'bpmn:Event')) {
    return !!eventDefinitionHelper.getTimerEventDefinition(element)
  }

  return false
}

const getInputOutputParameterLabel = function(param, translate) {
  if (is(param, 'camunda:InputParameter')) {
    return translate('Input Parameter')
  }

  if (is(param, 'camunda:OutputParameter')) {
    return translate('Output Parameter')
  }

  return ''
}

const getListenerLabel = function(param, translate) {
  if (is(param, 'camunda:ExecutionListener')) {
    return translate('Execution Listener')
  }

  if (is(param, 'camunda:TaskListener')) {
    return translate('Task Listener')
  }

  return ''
}

const PROCESS_KEY_HINT = 'This maps to the process definition key.'

// 通用属性面板 所有任务类型都会继承的内容
function createGeneralTabGroups(element, bpmnFactory, elementRegistry, elementTemplates, translate) {
  // refer to target element for external labels
  element = element.labelTarget || element

  const generalGroup = {
    id: 'general',
    label: translate('General'),
    entries: []
  }

  let idOptions
  let processOptions

  if (is(element, 'bpmn:Process')) {
    idOptions = { description: PROCESS_KEY_HINT }
  }

  if (is(element, 'bpmn:Participant')) {
    processOptions = { processIdDescription: PROCESS_KEY_HINT }
  }

  idProps(generalGroup, element, translate, idOptions)
  nameProps(generalGroup, element, translate)
  processProps(generalGroup, element, translate, processOptions)
  versionTag(generalGroup, element, translate)
  // 通用属性屏蔽扩展
  // executableProps(generalGroup, element, translate)
  // elementTemplateChooserProps(generalGroup, element, elementTemplates, translate)

  const customFieldsGroups = elementTemplateCustomProps(element, elementTemplates, bpmnFactory, translate)

  const detailsGroup = {
    id: 'details',
    label: translate('Details'),
    entries: []
  }
  serviceTaskDelegateProps(detailsGroup, element, bpmnFactory, translate)
  userTaskProps(detailsGroup, element, translate)
  scriptProps(detailsGroup, element, bpmnFactory, translate)
  linkProps(detailsGroup, element, translate)
  callActivityProps(detailsGroup, element, bpmnFactory, translate)
  eventProps(detailsGroup, element, bpmnFactory, elementRegistry, translate)
  conditionalProps(detailsGroup, element, bpmnFactory, translate)
  startEventInitiator(detailsGroup, element, translate) // this must be the last element of the details group!

  const multiInstanceGroup = {
    id: 'multiInstance',
    label: translate('Multi Instance'),
    entries: []
  }
  multiInstanceProps(multiInstanceGroup, element, bpmnFactory, translate)

  const asyncGroup = {
    id: 'async',
    label: translate('Asynchronous Continuations'),
    entries: []
  }
  asynchronousContinuationProps(asyncGroup, element, bpmnFactory, translate)

  const jobConfigurationGroup = {
    id: 'jobConfiguration',
    label: translate('Job Configuration'),
    entries: [],
    enabled: isJobConfigEnabled
  }
  jobConfiguration(jobConfigurationGroup, element, bpmnFactory, translate)

  const externalTaskGroup = {
    id: 'externalTaskConfiguration',
    label: translate('External Task Configuration'),
    entries: [],
    enabled: isExternalTaskPriorityEnabled
  }
  externalTaskConfiguration(externalTaskGroup, element, bpmnFactory, translate)

  const candidateStarterGroup = {
    id: 'candidateStarterConfiguration',
    label: translate('Candidate Starter Configuration'),
    entries: []
  }
  candidateStarter(candidateStarterGroup, element, bpmnFactory, translate)

  const historyTimeToLiveGroup = {
    id: 'historyConfiguration',
    label: translate('History Configuration'),
    entries: []
  }
  historyTimeToLive(historyTimeToLiveGroup, element, bpmnFactory, translate)

  const documentationGroup = {
    id: 'documentation',
    label: translate('Documentation'),
    entries: []
  }
  documentationProps(documentationGroup, element, bpmnFactory, translate)

  // 只显示常用General属性,下面按需求隐藏
  const groups = []
  groups.push(generalGroup)
  customFieldsGroups.forEach(function(group) {
    groups.push(group)
  })
  // 网关连线时用, 调用子流程时用
  groups.push(detailsGroup)
  // groups.push(externalTaskGroup)
  // groups.push(multiInstanceGroup)
  // groups.push(asyncGroup)
  // groups.push(jobConfigurationGroup)
  // groups.push(candidateStarterGroup)
  // groups.push(historyTimeToLiveGroup)
  // groups.push(documentationGroup)

  return groups
}

function createVariablesTabGroups(element, bpmnFactory, elementRegistry, translate) {
  const variablesGroup = {
    id: 'variables',
    label: translate('Variables'),
    entries: []
  }
  variableMapping(variablesGroup, element, bpmnFactory, translate)

  return [
    variablesGroup
  ]
}

function createFormsTabGroups(element, bpmnFactory, elementRegistry, translate) {
  const formGroup = {
    id: 'forms',
    label: translate('Forms'),
    entries: []
  }
  formProps(formGroup, element, bpmnFactory, translate)

  return [
    formGroup
  ]
}

function createListenersTabGroups(element, bpmnFactory, elementRegistry, translate) {
  const listenersGroup = {
    id: 'listeners',
    label: translate('Listeners'),
    entries: []
  }

  const options = listenerProps(listenersGroup, element, bpmnFactory, translate)

  const listenerDetailsGroup = {
    id: 'listener-details',
    entries: [],
    enabled: function(element, node) {
      return options.getSelectedListener(element, node)
    },
    label: function(element, node) {
      const param = options.getSelectedListener(element, node)
      return getListenerLabel(param, translate)
    }
  }

  listenerDetails(listenerDetailsGroup, element, bpmnFactory, options, translate)

  const listenerFieldsGroup = {
    id: 'listener-fields',
    label: translate('Field Injection'),
    entries: [],
    enabled: function(element, node) {
      return options.getSelectedListener(element, node)
    }
  }

  listenerFields(listenerFieldsGroup, element, bpmnFactory, options, translate)

  return [
    listenersGroup,
    listenerDetailsGroup,
    listenerFieldsGroup
  ]
}

function createInputOutputTabGroups(element, bpmnFactory, elementRegistry, translate) {
  const inputOutputGroup = {
    id: 'input-output',
    label: translate('Parameters'),
    entries: []
  }

  const options = inputOutput(inputOutputGroup, element, bpmnFactory, translate)

  const inputOutputParameterGroup = {
    id: 'input-output-parameter',
    entries: [],
    enabled: function(element, node) {
      return options.getSelectedParameter(element, node)
    },
    label: function(element, node) {
      const param = options.getSelectedParameter(element, node)
      return getInputOutputParameterLabel(param, translate)
    }
  }

  inputOutputParameter(inputOutputParameterGroup, element, bpmnFactory, options, translate)

  return [
    inputOutputGroup,
    inputOutputParameterGroup
  ]
}

function createConnectorTabGroups(element, bpmnFactory, elementRegistry, translate) {
  const connectorDetailsGroup = {
    id: 'connector-details',
    label: translate('Details'),
    entries: []
  }

  connectorDetails(connectorDetailsGroup, element, bpmnFactory, translate)

  const connectorInputOutputGroup = {
    id: 'connector-input-output',
    label: translate('Input/Output'),
    entries: []
  }

  const options = connectorInputOutput(connectorInputOutputGroup, element, bpmnFactory, translate)

  const connectorInputOutputParameterGroup = {
    id: 'connector-input-output-parameter',
    entries: [],
    enabled: function(element, node) {
      return options.getSelectedParameter(element, node)
    },
    label: function(element, node) {
      const param = options.getSelectedParameter(element, node)
      return getInputOutputParameterLabel(param, translate)
    }
  }

  connectorInputOutputParameter(connectorInputOutputParameterGroup, element, bpmnFactory, options, translate)

  return [
    connectorDetailsGroup,
    connectorInputOutputGroup,
    connectorInputOutputParameterGroup
  ]
}

function createFieldInjectionsTabGroups(element, bpmnFactory, elementRegistry, translate) {
  const fieldGroup = {
    id: 'field-injections-properties',
    label: translate('Field Injections'),
    entries: []
  }

  fieldInjections(fieldGroup, element, bpmnFactory, translate)

  return [
    fieldGroup
  ]
}

function createExtensionElementsGroups(element, bpmnFactory, elementRegistry, translate) {
  const propertiesGroup = {
    id: 'extensionElements-properties',
    label: translate('Properties'),
    entries: []
  }
  properties(propertiesGroup, element, bpmnFactory, translate)

  return [
    propertiesGroup
  ]
}

// Camunda Properties Provider /////////////////////////////////////

/**
 * A properties provider for Camunda related properties.
 *
 * @param {EventBus} eventBus
 * @param {BpmnFactory} bpmnFactory
 * @param {ElementRegistry} elementRegistry
 * @param {ElementTemplates} elementTemplates
 */
function CamundaPropertiesProvider(eventBus, bpmnFactory, elementRegistry, elementTemplates, translate) {
  PropertiesActivator.call(this, eventBus)

  this.getTabs = function(element) {
    const generalTab = {
      id: 'general',
      label: translate('General'),
      groups: createGeneralTabGroups(
        element, bpmnFactory,
        elementRegistry, elementTemplates, translate)
    }

    const variablesTab = {
      id: 'variables',
      label: translate('Variables'),
      groups: createVariablesTabGroups(element, bpmnFactory, elementRegistry, translate)
    }

    const formsTab = {
      id: 'forms',
      label: translate('Forms'),
      groups: createFormsTabGroups(element, bpmnFactory, elementRegistry, translate)
    }

    const listenersTab = {
      id: 'listeners',
      label: translate('Listeners'),
      groups: createListenersTabGroups(element, bpmnFactory, elementRegistry, translate),
      enabled: function(element) {
        return !eventDefinitionHelper.getLinkEventDefinition(element) ||
          (!is(element, 'bpmn:IntermediateThrowEvent') &&
          eventDefinitionHelper.getLinkEventDefinition(element))
      }
    }

    const inputOutputTab = {
      id: 'input-output',
      label: translate('Input/Output'),
      groups: createInputOutputTabGroups(element, bpmnFactory, elementRegistry, translate)
    }

    const connectorTab = {
      id: 'connector',
      label: translate('Connector'),
      groups: createConnectorTabGroups(element, bpmnFactory, elementRegistry, translate),
      enabled: function(element) {
        const bo = implementationTypeHelper.getServiceTaskLikeBusinessObject(element)
        return bo && implementationTypeHelper.getImplementationType(bo) === 'connector'
      }
    }

    const fieldInjectionsTab = {
      id: 'field-injections',
      label: translate('Field Injections'),
      groups: createFieldInjectionsTabGroups(element, bpmnFactory, elementRegistry, translate)
    }

    const extensionsTab = {
      id: 'extensionElements',
      label: translate('Extensions'),
      groups: createExtensionElementsGroups(element, bpmnFactory, elementRegistry, translate)
    }

    // 隐藏横排扩展
    return [
      generalTab
      // variablesTab,
      // connectorTab,
      // formsTab,
      // listenersTab,
      // inputOutputTab,
      // fieldInjectionsTab,
      // extensionsTab
    ]
  }
}

CamundaPropertiesProvider.$inject = [
  'eventBus',
  'bpmnFactory',
  'elementRegistry',
  'elementTemplates',
  'translate'
]

inherits(CamundaPropertiesProvider, PropertiesActivator)

module.exports = CamundaPropertiesProvider
