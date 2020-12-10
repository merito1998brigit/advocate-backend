// import React from 'react'
// // import CKEditor from 'ckeditor4-react'
// import CKEditor from 'ckeditor4-react-advanced'

// class Editor extends React.PureComponent {
//   // constructor(props) {
//   //   super(props)

//   //   this.state = {
//   //     data: '<p>React is really <em>nice</em>!</p>',
//   //   }

//   //   // this.handleChange = this.handleChange.bind( this );
//   //   this.onEditorChange = this.onEditorChange.bind(this)
//   // }

//   // onEditorChange(evt) {
//   //   this.setState({
//   //     data: evt.editor.getData(),
//   //   })
//   // }

//   render() {
//     const { onChange, editorHtml, placeholder } = this.props
//     console.log(editorHtml, placeholder)

//     return (
//       <div>
//         <CKEditor
//           // data={placeholder}
//           data={editorHtml}
//           onChange={onChange}
//           placeholder={placeholder}
//           defaultValue={editorHtml}
//           config={{
//             toolbar: [
//               ['Bold', 'Italic', 'Underline', 'Link', 'Unlink', 'Image'],
//               ['NumberedList', 'BulletedList', 'list', 'indent', 'blocks', 'Paragraph'],
//               [
//                 'Image',
//                 'Flash',
//                 'Table',
//                 'HorizontalRule',
//                 'Smiley',
//                 'SpecialChar',
//                 'PageBreak',
//                 'Iframe',
//               ],
//               // ['Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo'],
//               ['Source', '-', 'Save', 'NewPage', 'Preview', 'Print', '-', 'Templates'],
//               ['Find', 'Replace', '-', 'SelectAll', '-', 'Scayt'],
//               [
//                 'Form',
//                 'Checkbox',
//                 'Radio',
//                 'TextField',
//                 'Textarea',
//                 'Select',
//                 'Button',
//                 'ImageButton',
//                 'HiddenField',
//               ],
//             ],

//             width: '600px',
//             height: '350px',
//           }}
//         />
//       </div>
//     )
//   }
// }

// export default Editor
