import Vue from 'vue'
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import Quill from 'quill'
import imageResize from 'quill-image-resize-module'
import { ImageDrop } from 'quill-image-drop-module'
Quill.register('modules/imageDrop', ImageDrop)
Quill.register('modules/imageResize', imageResize)

Vue.use(VueQuillEditor)
