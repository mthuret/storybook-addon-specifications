import React from "react";
import {storiesOf, action} from '@storybook/react'
import { specs, describe, it} from '../../src'
import Enzyme, {mount} from "enzyme"
import Adapter from "enzyme-adapter-react-16"
Enzyme.configure({ adapter: new Adapter() });
import expect from "expect";


const stories = storiesOf('Button', module);

stories.add('Hello World', function () {
  const helloWorldStory =
    <button onClick={action('Hello World')}>
      Hello World
    </button>;

  specs(() => describe('Hello World', function () {
    it('Should have the Hello World label', function () {
      let output = mount(helloWorldStory);
      expect(output.text()).toContain('Hello Wrld');
    });
    describe('Expects should work nexted too', () => {
      it('Should have the Hello World label', function () {
        let output = mount(helloWorldStory);
        expect(output.text()).toContain('Hello Wrld');
      });
    });

    it('Should have the Hello World label', function () {
      let output = mount(helloWorldStory);
      expect(output.text()).toContain('Hello World');
    });
  }));

  return helloWorldStory;
});