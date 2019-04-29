import PaletteProvider from './PaletteProvider'
import ContextPadProvider from './ContextPadProvider'
import ReplaceMenuProvider from './ReplaceMenuProvider'
import CamundaPropertiesProvider from './CamundaPropertiesProvider'

export default {
  __depends__: [
    require('bpmn-js-properties-panel/lib/provider/camunda/element-templates'),
    require('diagram-js/lib/i18n/translate').default
  ],
  __init__: [
    'paletteProvider',
    'contextPadProvider',
    'replaceMenuProvider',
    'propertiesProvider'
  ],
  paletteProvider: ['type', PaletteProvider],
  contextPadProvider: ['type', ContextPadProvider],
  replaceMenuProvider: ['type', ReplaceMenuProvider],
  propertiesProvider: ['type', CamundaPropertiesProvider]
}
