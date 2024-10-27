const TOOLBAR_DESCRIPTION = {
    left: {
        selector: '.toolbar__left',
        buttons: {
            applyButton: {
            modifiers: ['button--green'],
            buttonContent: 'Apply'
        },
        clearButton: {
            modifiers: ['button--red'],
            buttonContent: 'Clear'
        },
        }
    },
    right: {
        selector: '.toolbar__right',
        buttons: {
            copyButton: {
                modifiers: [],
                buttonContent: 'Copy'
            },
            saveButton: {
                modifiers: [],
                buttonContent: 'Save'
            },
        }
    },
};

export { TOOLBAR_DESCRIPTION }