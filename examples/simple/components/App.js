import React, { useState } from 'react';
// import { Textfit } from 'react-textfit';

const inlineStyle = {
  height: 400,
};

const App = () => {
  const [text, setText] = useState('Edit this text!');
  const [mode, setMode] = useState('multi');
  const [forceSingle, setForceSingle] = useState(true);

  return (
    <div>
      <h1 className="headline">
        react-textfit
        <a
          href="https://github.com/malte-wessel/react-textfit"
          rel="noopener noreferrer"
          style={{ float: 'right' }}
          target="_blank"
        >
          <i className="fa fa-github" />
        </a>
      </h1>
      <div className="row">
        <div className="column-100">
          <ul>
            <li>
              fit <strong>headlines and paragraphs</strong> into any element
            </li>
            <li>
              <strong>fast:</strong> uses binary search for efficiently find the correct fit
            </li>
            <li>
              <strong>100%</strong> react-goodness
            </li>
            <li>
              works with <strong>any style</strong> configuration (line-height, padding, ...)
            </li>
          </ul>
        </div>
      </div>
      <h2 className="headline">Examples</h2>
      <div className="row">
        <div className="column-100">
          {/* <Textfit className="box box-fat" max={500} mode="single">
            Fat headlines!
          </Textfit> */}
        </div>
      </div>
      <div className="row">
        <div className="column-25">
          {/* <Textfit style={inlineStyle}>Multi line paragraphs at all sizes!</Textfit> */}
        </div>
        <div className="column-25">
          {/* <Textfit style={inlineStyle}>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
            invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
          </Textfit> */}
        </div>
        <div className="column-25">
          {/* <Textfit style={inlineStyle}>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
            invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
            accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
            sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
            sadipscing elitr.
          </Textfit> */}
        </div>
        <div className="column-25">
          {/* <Textfit style={inlineStyle}>
            <strong>Lorem ipsum dolor sit amet</strong>, consetetur sadipscing elitr,{' '}
            <em>sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat</em>,
            sed diam voluptua. <b>At vero eos et accusam et justo duo dolores et ea rebum</b>.{' '}
            <br /> Stet clita kasd gubergren, <del>no sea takimata sanctus</del> est Lorem ipsum
            dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr,{' '}
            <small>sed diam nonumy eirmod tempor invidunt ut</small> labore et dolore magna aliquyam
            erat, sed diam voluptua.
          </Textfit> */}
        </div>
      </div>
      <h2 className="headline">Playground</h2>
      <div className="row">
        <div className="column-50">
          {/* <Textfit
            className="box box-fat"
            forceSingleModeWidth={forceSingleModeWidth}
            max={500}
            mode={mode}
            style={inlineStyle}
          >
            {text}
          </Textfit> */}
        </div>
        <div className="column-50 playground">
          <textarea rows="8" value={text} onChange={e => setText(e.target.value)} />
          <div className="row">
            <div className="column-50">
              <strong>Mode</strong>
            </div>
            <div className="column-50">
              <select
                value={mode}
                onBlur={e => setMode(e.target.value)}
                onChange={e => setMode(e.target.value)}
              >
                <option value="multi">Multi line</option>
                <option value="single">Single line</option>
              </select>
            </div>
          </div>
          <div className="row">
            <div className="column-50">
              <strong>Force width</strong>
              <br />
              <small>(only single mode)</small>
            </div>
            <div className="column-50">
              <label htmlFor="force-width">
                <input
                  checked={forceSingle}
                  disabled={mode === 'multi'}
                  name="force-width"
                  type="checkbox"
                  value
                  onChange={e => setForceSingle(e.target.checked)}
                />{' '}
                Force width
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

App.displayName = 'App';

export default App;
