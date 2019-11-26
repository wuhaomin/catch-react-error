import React from 'react';
import catchreacterror, { IsomorphicErrorBoundary } from './dist';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>这是正常展示内容</h1>
            </header>
            <Test></Test>
        </div>
    );
}

class Test extends React.Component {
    constructor() {
        super();
        this.state = {
            foo: 1,
        };
        this.buttonRef = React.createRef();
    }
    fallback() {
        return <div>Test Error</div>;
    }
    render() {
        const { foo } = this.state;
        console.log(foo);
        return (
            <div>
                <Button text="click me" ref={this.buttonRef} />
                <Label list={['a', 'abc', null, 'abcd']} />
            </div>
        );
    }

    componentDidMount() {
        console.log(this.buttonRef.current.hello());
    }
}
@catchreacterror(IsomorphicErrorBoundary)
class Button extends React.Component {
    hello() {
        console.log('hello');
    }
    handleClick() {
        console.log('click me !');
    }

    render() {
        // const emptyObj = {};
        // console.log(emptyObj.a.b);
        return <button onClick={this.handleClick}>click me</button>;
    }

    componentDidMount() {
        const emptyObj = {};
        //console.log(emptyObj.a.b);
    }
}

const Label = ({ list }) => {
    return list.map(x => <SafeContent x={x} kye={x} />);
};

const Content = ({ x }) => <div>{x.length}</div>;

const SafeContent = catchreacterror(IsomorphicErrorBoundary)(
    Content,
    () => 'Content error fallback'
);

export default App;
