import React from 'react'
import './index.css'

class Editor extends React.PureComponent {
  componentDidMount() {
    const { onChange } = this.props
    window.tinymce.init({
      selector: '.kt-tinymce-4',
      height: 400,
      theme: 'modern',
      menubar: 'file edit view insert format tools table tc help',
      toolbar: [
        'styleselect fontselect fontsizeselect',
        'undo redo | cut copy paste | bold italic | link image | alignleft aligncenter alignright alignjustify',
        'bullist numlist | outdent indent | blockquote subscript superscript | advlist | autolink | lists charmap | print preview |  code',
      ],
      plugins: 'advlist autolink link image lists charmap print preview code',
    })
    window.tinymce.activeEditor.on('change', () => {
      onChange(window.tinyMCE.activeEditor.getContent())
    })
  }

  render() {
    const { editorHtml, placeholder } = this.props
    console.log('editorhtml', editorHtml)

    return (
      <div>
        <div>
          <textarea
            placeholder={placeholder}
            className="kt-tinymce-4"
            value={editorHtml}
            defaultValue={editorHtml}
          />
        </div>
      </div>
    )
  }
}

Editor.defaultProps = {
  placeholder: 'Write something...',
}

export default Editor
