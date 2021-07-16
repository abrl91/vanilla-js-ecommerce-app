const layout = require('../layout');
const { getError } = require('../../../utils/utils');

module.exports = ({ errors }) => {
    return layout({
        content: `
            <form method="POST">
                <input placeholder="title" name="title" />
                ${getError(errors, 'title')}
                <input placeholder="price" name="price" />
                ${getError(errors, 'price')}
                <input placeholder="file" type="file" name="image" />
                <button>Submit</button>
            </form>
        `
    });
};
