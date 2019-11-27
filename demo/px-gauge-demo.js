/*
Copyright (c) 2018, General Electric

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
/* Common imports */
/* Common demo imports */
/* Imports for this component */
/* Demo DOM module */
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import '@polymer/polymer/polymer-legacy.js';

import 'px-demo/px-demo-header.js';
import 'px-demo/px-demo-api-viewer.js';
import 'px-demo/px-demo-footer.js';
import 'px-demo/px-demo-configs.js';
import 'px-demo/px-demo-props.js';
import 'px-demo/px-demo-interactive.js';
import 'px-demo/px-demo-component-snippet.js';
import 'px-demo/px-demo-code-editor.js';
import '../px-gauge.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
Polymer({
  _template: html`
    <!-- Header -->
    <px-demo-header module-name="px-gauge" description="The px-gauge component radially visualizes a single value within a range." mobile="" tablet="" desktop="">
    </px-demo-header>

    <!-- Interactive -->
    <px-demo-interactive>
      <!-- Configs -->
      <px-demo-configs slot="px-demo-configs" configs="[[configs]]" props="{{props}}" chosen-config="{{chosenConfig}}"></px-demo-configs>

      <!-- Props -->
      <px-demo-props slot="px-demo-props" props="{{props}}" config="[[chosenConfig]]"></px-demo-props>
      <px-demo-code-editor slot="px-demo-code-editor" props="{{props}}"></px-demo-code-editor>

      <!-- Component ---------------------------------------------------------->
      <px-demo-component slot="px-demo-component">

        <div style="width: 250px;">
          <px-gauge normal="{{props.normal.value}}" anomaly="{{props.anomaly.value}}" abnormal="{{props.abnormal.value}}" error="{{props.error.value}}" max="{{props.max.value}}" min="{{props.min.value}}" unit="{{props.unit.value}}" value="{{props.value.value}}" bar-width="{{props.barWidth.value}}" id="gaugeChartDemo" width="250">
          </px-gauge>
        </div>
      </px-demo-component>
      <!-- END Component ------------------------------------------------------>

      <px-demo-component-snippet slot="px-demo-component-snippet" element-properties="{{props}}" element-name="px-gauge" links-includes="[[linksIncludes]]">
      </px-demo-component-snippet>
    </px-demo-interactive>

    <!-- API Viewer -->
    <px-demo-api-viewer source="px-gauge"></px-demo-api-viewer>

    <!-- Footer -->
    <px-demo-footer></px-demo-footer>
`,

  is: 'px-gauge-demo',

  properties: {
    props: {
      type: Object,
      value: function(){ return this.demoProps; }
    },
    configs: {
      type: Array,
      value: function(){
        return [
          { configName: "Default",
            configReset: true }
        ]
      }
    }
  },

  demoProps: {
    value: {
      type: Number,
      defaultValue: 30,
      inputType: "text"
    },
    min: {
      type: Number,
      defaultValue: 0,
      inputType: "text"
    },
    max: {
      type: Number,
      defaultValue: 100,
      inputType: "text"
    },
    barWidth: {
      type: Number,
      defaultValue: 0,
      inputType: "text"
    },
    unit: {
      type: String,
      defaultValue: 'unit',
      inputType: "text"
    },
    error: {
      type: Array,
      defaultValue: [ [0, 12], [79, 100] ],
      inputType: "code:JSON"
    },
    abnormal: {
      type: Array,
      defaultValue: [  [12, 32], [68, 79]  ],
      inputType: "code:JSON"
    },
    anomaly: {
      type: Array,
      defaultValue: [ [32, 45],  [54, 68]  ],
      inputType: "code:JSON"
    },
    normal: {
      type: Array,
      defaultValue: [ [45, 54] ],
      inputType: "code:JSON"
    }
  }
});
