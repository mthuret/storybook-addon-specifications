import React from "react";
import {mount} from "enzyme";
import expect from "expect";


const stories = storiesOf('Button - CI Sample', module);

const helloWorldStory =
  <button onClick={action('Hello World')}>
    Hello World
  </button>;

const buttonSpecs = describe('Hello World', function () {
  it('Should have the Hello World label', function () {
    let output = mount(helloWorldStory);
    expect(output.text()).toContain('Hello Wrld');
  });

  it('Should have the Hello World label', function () {
    let output = mount(helloWorldStory);
    expect(output.text()).toContain('Hello World');
  });
});

stories.add('Hello World', function () {
  specs(buttonSpecs);
  return helloWorldStory;
});

const helloEarthStory =
  <button onClick={action('Hello Earth')}>
    Hello Earth
  </button>;

const helloEarthSpecs = describe('Hello Earth', function () {
  it('Should indicate that only one item is left', function () {
    let output = mount(helloEarthStory);
    expect(output.text()).toContain('Hello Earth');
  });
});

stories.add('Hello Earth', function () {
  specs(helloEarthSpecs);
  return helloEarthStory;
});