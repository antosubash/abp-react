import { QuoteBlock } from './QuoteBlock'
import { QuoteBlockDefaults } from './QuoteBlockDefaults'
import { QuoteBlockFields } from './QuoteBlockFields'

export const QuoteBlockConfig = {
  label: 'Quote',
  fields: QuoteBlockFields,
  defaultProps: QuoteBlockDefaults,
  render: QuoteBlock,
}
