import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import { createDropdown } from '@ckeditor/ckeditor5-ui/src/dropdown/utils';

export default class CustomFormPlugin extends Plugin {
  init() {
    const editor = this.editor;
    const toolbar = editor.ui.componentFactory;

    // Add a custom button to the toolbar
    toolbar.add('customForm', locale => {
      const button = new ButtonView(locale);

      button.set({
        label: 'Insert Custom Form',
        icon: 'deepl.svg',  // Add your icon here
        tooltip: true
      });

      // Execute when button is clicked
      button.on('execute', () => {
        // Open a UI dialog to get input
        this._openFormDialog();
      });

      return button;
    });
  }

  _openFormDialog() {
    const editor = this.editor;
    const formDialog = new CustomFormDialog(editor);

    // Show dialog with select and input fields
    formDialog.show();
  }
}

class CustomFormDialog {
  constructor(editor) {
    this.editor = editor;
  }

  show() {
    const editor = this.editor;

    // Create your dialog UI with a select and two input fields
    const dialogUI = document.createElement('div');
    dialogUI.innerHTML = `
      <label for="dropdown">Choose an option:</label>
      <select id="dropdown">
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
      </select>
      <br/>
      <label for="input1">Input 1:</label>
      <input type="text" id="input1" placeholder="Enter some text"/>
      <br/>
      <label for="input2">Input 2:</label>
      <input type="text" id="input2" placeholder="Enter more text"/>
      <br/>
      <button id="insertButton">Insert</button>
    `;

    // Append dialog to the document or show in a modal
    document.body.appendChild(dialogUI);

    // Handle form submission and inserting content into CKEditor
    document.getElementById('insertButton').addEventListener('click', () => {
      const dropdownValue = document.getElementById('dropdown').value;
      const input1Value = document.getElementById('input1').value;
      const input2Value = document.getElementById('input2').value;

      // Insert the values into the editor content
      const html = `<div class="custom-form">
                      <p>Option: ${dropdownValue}</p>
                      <p>Input 1: ${input1Value}</p>
                      <p>Input 2: ${input2Value}</p>
                    </div>`;

      editor.model.change(writer => {
        editor.model.insertContent(writer.createRawElement(html));
      });

      // Close the dialog
      document.body.removeChild(dialogUI);
    });
  }
}
