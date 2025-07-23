import { WelcomeBlock } from './WelcomeBlock'
import { WelcomeBlockDefaults } from './WelcomeBlockDefaults'
import { WelcomeBlockFields } from './WelcomeBlockFields'

export const WelcomeBlockConfig = {
  label: 'Welcome',
  fields: WelcomeBlockFields,
  defaultProps: WelcomeBlockDefaults,
  render: WelcomeBlock,
}
