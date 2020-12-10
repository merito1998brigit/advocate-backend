// import React from 'react'
// // import ReactQuill from 'react-quill'
// import 'react-quill/dist/quill.snow.css'
// import { Editor } from "@tinymce/tinymce-react";
// import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
// // import PropTypes from 'prop-types'
// import './index.css'

// /*
//  * Simple editor component that takes placeholder text as a prop
//  */
// class NewEditor extends React.PureComponent {
//   render() {
//     const { onChange, editorHtml, placeholder } = this.props
//     return (
//       <div>
//         <div>
//           {/* <ReactQuill
//             theme="snow"
//             onChange={onChange}
//             value={editorHtml}
//             modules={Editor.modules}
//             formats={Editor.formats}
//             bounds=".app"
//             placeholder={placeholder}
//           /> */}
//           <Editor
//             apiKey='sbl10r20snr1e99ymut1ofby1s2d2ecooq68uhe0qy9rcmb5'
//             // placeholder="Write something..."
//             placeholder={placeholder}
//             value={editorHtml}
//             // tinydrive_token_provider=''
//             initialValue='Write something...'
//             init={{
//               height: '300',
//               auto_focus: true,
//               //     mobile: {
//               //       plugins: 'print preview powerpaste casechange importcss tinydrive searchreplace autolink autosave save directionality advcode visualblocks visualchars fullscreen image link media mediaembed template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists checklist wordcount tinymcespellchecker a11ychecker textpattern noneditable help formatpainter pageembed charmap mentions quickbars linkchecker emoticons advtable'
//               //     },
//               //     menu: {
//               //       tc: {
//               //         title: 'TinyComments',
//               //         items: 'addcomment showcomments deleteallconversations'
//               //       }
//               //     },
//               //     // menubar: 'file edit view insert format tools table menu help',
//               resize: true,
//               icons: "jam",
//               //     image_caption: true,
//               //     // skin: "fabric",
//               //     // content_css: "document",
//               //     // plugins: ['advlist autolink lists link image charmap print preview anchor', 'searchreplace visualblocks code fullscreen', 'insertdatetime media table paste code help wordcount'
//               //     // ],
//               //     selector: 'textarea#full-featured',
//               //     plugins: 'print preview powerpaste casechange importcss tinydrive searchreplace autolink autosave save directionality advcode visualblocks visualchars fullscreen image link media mediaembed template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists checklist wordcount tinymcespellchecker a11ychecker imagetools textpattern noneditable help formatpainter permanentpen pageembed charmap tinycomments mentions quickbars linkchecker emoticons advtable',

//               //  menubar: 'file edit view insert format tools table tc help',
//               // toolbar: 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist checklist | forecolor backcolor casechange permanentpen formatpainter removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media pageembed template link anchor codesample | a11ycheck ltr rtl | showcomments addcomment',
//               //     // toolbar: 'undo redo | formatselect | bold italic forecolor backcolor link | alignleft aligncenter alignright alignjustify | hr bullist numlist table | bullist numlist outdent indent | removeformat code |subscript superscript | help'

//               selector: 'textarea#full-featured',
//               plugins: 'print preview powerpaste casechange importcss tinydrive searchreplace autolink autosave save directionality advcode visualblocks visualchars fullscreen link  template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists checklist wordcount tinymcespellchecker a11ychecker textpattern noneditable help formatpainter permanentpen charmap tinycomments mentions quickbars linkchecker emoticons advtable',
//               mobile: {
//                 plugins: 'print preview powerpaste casechange importcss tinydrive searchreplace autolink autosave save directionality advcode visualblocks visualchars fullscreen link  template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists checklist wordcount tinymcespellchecker a11ychecker textpattern noneditable help formatpainter  charmap mentions quickbars linkchecker emoticons advtable'
//               },
              
//               menu: {
//                 tc: {
//                   title: 'TinyComments',
//                   // items: 'addcomment showcomments deleteallconversations'
//                 }
//               },
//               menubar: 'file edit view insert format tools table menu help',
//               toolbar: 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist checklist | forecolor backcolor casechange permanentpen formatpainter removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | template link anchor codesample | a11ycheck ltr rtl |',
//               autosave_ask_before_unload: true,
//               autosave_interval: '30s',
//               autosave_prefix: '{path}{query}-{id}-',
//               autosave_restore_when_empty: false,
//               autosave_retention: '2m',
//               // image_advtab: true,
//               link_list: [
//                 { title: 'Riolabz', value: 'https://riolabz.com' },
//               ],
//               // image_list: [
//               //   { title: 'My page 1', value: 'https://www.tiny.cloud' },
//               //   { title: 'My page 2', value: 'http://www.moxiecode.com' }
//               // ],
//               // image_class_list: [
//               //   { title: 'None', value: '' },
//               //   { title: 'Some class', value: 'class-name' }
//               // ],
//               importcss_append: true,
//               templates: [
//                 { title: 'New Table', description: 'creates a new table', content: '<div class="mceTmpl"><table width="98%%"  border="0" cellspacing="0" cellpadding="0"><tr><th scope="col"> </th><th scope="col"> </th></tr><tr><td> </td><td> </td></tr></table></div>' },
//                 { title: 'Starting my story', description: 'A cure for writers block', content: 'Once upon a time...' },
//                 { title: 'New list with dates', description: 'New List with dates', content: '<div class="mceTmpl"><span class="cdate">cdate</span><br /><span class="mdate">mdate</span><h2>My List</h2><ul><li></li><li></li></ul></div>' }
//               ],
//               template_cdate_format: '[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]',
//               template_mdate_format: '[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]',
//               // height: 600,
//               // image_caption: true,
//               quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quicktable',
//               noneditable_noneditable_class: 'mceNonEditable',
//               toolbar_mode: 'sliding',
//               spellchecker_whitelist: ['Ephox', 'Moxiecode'],
//               tinycomments_mode: 'embedded',
//               content_style: '.mymention{ color: gray; }',
//               contextmenu: 'link table configurepermanentpen',
//               a11y_advanced_options: true,
//               // skin: useDarkMode ? 'oxide-dark' : 'oxide',
//               // content_css: useDarkMode ? 'dark' : 'default',
//               /*
//               The following settings require more configuration than shown here.
//               For information on configuring the mentions plugin, see:
//               https://www.tiny.cloud/docs/plugins/mentions/.
//               */
//               mentions_selector: '.mymention',
//               // mentions_fetch: mentions_fetch,
//               // mentions_menu_hover: mentions_menu_hover,
//               // mentions_menu_complete: mentions_menu_complete,
//               // mentions_select: mentions_select

//             }}

//             onChange={onChange}
//           />
//         </div>
//       </div>
//     )
//   }
// }

// /*
//  * Quill modules to attach to editor
//  * See https://quilljs.com/docs/modules/ for complete options
//  */
// Editor.modules = {
//   toolbar: [
//     [{ header: '1' }, { header: '2' }, { font: [] }],
//     [{ size: [] }],
//     [{ color: ["#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466", 'custom-color'] }],
//     ['bold', 'italic', 'underline', 'strike', 'blockquote'],
//     [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
//     ['link', 'video'],
//     ['clean'],
//   ],
//   clipboard: {
//     // toggle to add extra line breaks when pasting HTML:
//     matchVisual: false,
//   },
// }
// /*
//  * Quill editor formats
//  * See https://quilljs.com/docs/formats/
//  */
// Editor.formats = [
//   'header',
//   'font',
//   'size',
//   'color',
//   'bold',
//   'italic',
//   'underline',
//   'strike',
//   'blockquote',
//   'list',
//   'bullet',
//   'indent',
//   'link',
//   'image',
//   'video',
// ]

// /*
//  * PropType validation
//  */
// // Editor.propTypes = {
// //   placeholder: PropTypes.string,
// // }

// // Editor.defaultProps = {
// //   placeholder: 'Write something...',
// // }

// export default NewEditor
