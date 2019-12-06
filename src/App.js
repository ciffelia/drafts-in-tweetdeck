import $ from './jQuery'
import DraftsStorage from './DraftsStorage'
import DraftList from './DraftList'

class App {
  constructor () {
    this.init = this.init.bind(this)
    this.handleComposerOpen = this.handleComposerOpen.bind(this)
    this.handleComposeTextChange = this.handleComposeTextChange.bind(this)
    this.handleButtonClick = this.handleButtonClick.bind(this)
    this.handleDraftSelect = this.handleDraftSelect.bind(this)

    this.$buttonWrapper = $('<div class="pull-left"></div>')
    this.$button = $(
      '<button class="Button--primary btn-extra-height padding-v--6 padding-h--12"></button>'
    )
    this.$button.click(this.handleButtonClick)
    this.$button.appendTo(this.$buttonWrapper)

    this.draftList = new DraftList()
  }

  init () {
    this.$composer = $('.drawer[data-drawer="compose"]')
    this.$composer.arrive('div.compose', this.handleComposerOpen)
  }

  handleComposerOpen () {
    this.$composerCloseButton = this.$composer.find('.js-compose-close')

    this.$composeText = this.$composer.find('.compose-text')
    this.$composeText.on('input', this.handleComposeTextChange)

    this.$buttonsRow = this.$composer
      .find('.js-send-button-container')
      .closest('.cf')
    this.$buttonWrapper.prependTo(this.$buttonsRow)

    this.draftList.init(this.handleDraftSelect)
    this.draftList.$draftList.insertAfter(this.$buttonsRow)

    this.handleComposeTextChange()
  }

  handleComposeTextChange () {
    if (this.$composeText.val() === '') this.$button.text('View drafts')
    else this.$button.text('Save')
  }

  handleButtonClick () {
    if (this.$composeText.val() === '') this.draftList._show()
    else this.saveToDrafts()
  }

  handleDraftSelect (draft) {
    this.$composeText.val(draft)
    this.$composeText[0].dispatchEvent(new Event('input'))
  }

  closeComposer () {
    this.$composerCloseButton.click()
  }

  saveToDrafts () {
    const text = this.$composeText.val()
    if (text === '') return

    DraftsStorage.addDraft(text)
    this.closeComposer()
  }
}

export default App
