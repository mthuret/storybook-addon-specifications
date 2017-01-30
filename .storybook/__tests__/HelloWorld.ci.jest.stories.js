import React from "react";
import {
  mount
} from "enzyme";
import expect from "expect";
import {HELLO_WORLD} from './HelloWorld.stories';

describe('HelloWorld', function () {
  describe('story1', function () {
    it('Should have the Hello World label', function () {
      let output = mount(HELLO_WORLD);
      expect(output.text()).toContain('Hello World');
      expect(1).toBe(2);
    });
  })
  describe('story2', function () {
    it('Should have the Hello World label', function () {
      let output = mount(HELLO_WORLD);
      expect(output.text()).toContain('Spec1');
    });
  })
})
