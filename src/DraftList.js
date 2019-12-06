import DraftsStorage from './DraftsStorage'
import $ from './jQuery'

class DraftList {
  init (selectHandler) {
    this.selectHandler = selectHandler

    this.$draftList = $(
      '<div class="popover" style="max-height: 300px; width: 242px; overflow-wrap: break-word; overflow-y: scroll"></div>'
    )
    this.$draftList.hide()

    const drafts = DraftsStorage.readDrafts()

    if (drafts.length !== 0) {
      for (const [i, draftText] of drafts.entries()) {
        this._createDraftItemElem(i, draftText).appendTo(this.$draftList)
      }
    } else {
      this.$draftList.html(`
        <div style="width: 100%; height: 100px; display: flex; justify-content: center; align-items: center">
          <p style="color: #8899a6; font-size: 16px">No drafts saved.</p>
        </div>
      `)
    }
  }

  _createDraftItemElem (i, text) {
    const $draft = $(
      `<article class="stream-item is-actionable"><div class="item-box">${text}</div></article>`
    )
    $draft.click(() => {
      this._hide()
      DraftsStorage.removeDraft(i)
      this.selectHandler(text)
    })
    return $draft
  }

  _show () {
    this.$draftList.show()

    setTimeout(() => {
      $(document).on('click.hideDrafts', e => {
        if ($(e.target).closest(this.$draftList).length === 0) this._hide()
      })
    }, 0)
  }

  _hide () {
    this.$draftList.hide()

    $(document).off('click.hideDrafts')
  }
}

export default DraftList
