class MyFramework {
    constructor(rootElement) {
        this.rootElement = document.querySelector(rootElement);
    }

    render(component) {
        this.rootElement.innerHTML += component.render();
        this.bindEvents(component);
    }

    bindEvents(component) {
        if (component.events) {
            Object.keys(component.events).forEach(eventSelector => {
                const [event, selector] = eventSelector.split(' ');
                const elements = this.rootElement.querySelectorAll(selector);
                elements.forEach(element => {
                    element.addEventListener(event, component.events[eventSelector].bind(component));
                });
            });
        }
    }
}

class Component {
    constructor(props = {}) {
        this.props = props;
    }

    render() {
        return '';
    }
}

class HelloWorld extends Component {
    render() {
        return `<h1>Hello, ${this.props.name || 'World'}!</h1>`;
    }
}

class Button extends Component {
    render() {
        return `<button id="myButton">${this.props.label || 'Click me'}</button>`;
    }

    events = {
        'click #myButton': function () {
            alert('Button clicked!');
        }
    }
}
