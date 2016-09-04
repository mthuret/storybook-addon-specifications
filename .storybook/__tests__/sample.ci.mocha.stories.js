import React from "react";
import {mount} from "enzyme";
import expect from "expect";

const stories = storiesOf('Button - CI MOCHA Sample', module);

stories.add('Hello World', function () {
  const helloWorldStory =
    <button onClick={action('Hello World')}>
      Hello World
    </button>;

  specs(() => describe('Hello World', function () {
    let output;
    beforeEach(function() {
      console.log('BEFORE EACH');
      output = mount(helloWorldStory);
    });

    before(function() {
      console.log('BEFORE');
    });

    afterEach(function() {
      console.log('AFTER EACH');
    });

    after(function() {
      console.log('AFTER ');
    });

    it('Should have the Hello World label', function () {
      expect(output.text()).toContain('Hello World');
    });

    it('Should have the Hello World label', function () {
      expect(output.text()).toContain('Hello World');
    });

  }));
  return helloWorldStory;
});

stories.add('Hello Earth', function () {
  const helloEarthStory =
    <button onClick={action('Hello Earth')}>
      Hello Earth
    </button>;

  specs(() => describe('Hello Earth', function () {
    it('Should have the Hello Earth label', function () {
      let output = mount(helloEarthStory);
      expect(output.text()).toContain('Hello Earth');
    });
  }));

  return helloEarthStory;
});
