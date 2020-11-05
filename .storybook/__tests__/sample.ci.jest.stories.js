import React from "react";
import {storiesOf, action, describe, it, specs,
beforeEach, before, after, afterEach, xdescribe,
fit, xit} from "../facade";
import {mount} from "enzyme";
import expect from "expect";


const stories = storiesOf('Button - CI JEST Sample', module);

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

    afterEach(function() {
      console.log('AFTER EACH');
    });

    it('Should have the Hello World label', function () {
      expect(output.text()).toContain('Hello World');
    });

    it('Should have the Hello World label', function (done) {
      expect(output.text()).toContain('Hello World');
      done();
    });

    it('Should have the Hello World label', async function () {
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
