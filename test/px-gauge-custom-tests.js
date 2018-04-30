/**
 * @license
 * Copyright (c) 2018, General Electric
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

  suite('Custom Automation Tests for px-gauge', function() {
    let el;
    setup( done => {
      el = fixture('px-gauge-fixture');
      flush(() => done());
    });
    test('Check initial properties of gauge chart', function(done) {
      assert.equal(el.value, 0);
      assert.equal(el.min, 0);
      assert.equal(el.max, 100);
      assert.equal(el.error.join(), [].join());
      done();
    });

    test('Check text value of px-gauge', function(done) {
      el.value = 50;
      async.until(
        () => Polymer.dom(el.root).querySelector('.text-value').innerText === "50",
        cb => setTimeout(cb, 500),
        () => {
          assert.equal(Polymer.dom(el.root).querySelector('.text-value').innerText, "50");
          done();
        }
      );
    });

    test('Check unit text value of px-gauge', function(done) {
      el.unit = 'Kw';
      assert.equal(Polymer.dom(el.root).querySelector('.text-unit').innerText, 'Kw');
      done();
    });

    test('Check calculated value of px-gauge', function(done) {
      el.min = 0;
      el.max = 10;
      el.value = 5;
      assert.equal(el._calculatedValue, 0.5);
      done();
    });

    test('Check color of gauge bar is normal by default', function(done) {
      //wait for d3 render svg
      setTimeout(function() {
        el.min = 0;
        el.max = 100;
        el.value = 80;
        //wait for animation finished
        setTimeout(function() {
          var chart = Polymer.dom(el.root).querySelector('.chart-filled');
          if (Polymer.dom(el.root).querySelector('.chart-filled').classList) {
            assert.equal(chart.classList.contains('normal'), true);
            done();
          } else {
            var classes = chart.getAttribute('class').split(' ');
            assert.isAtLeast(classes.indexOf('normal'), 0);
            done();
          }
        }, 1000)
      }, 500);
    });

    test('Check color changing process', function(done) {
      //wait for d3 render svg
      setTimeout(function() {
        el.min = 0;
        el.max = 100;
        el.value = 80;
        el.error = [
          [0, 12],
          [79, 100]
        ];
        el.abnormal = [
          [12, 32],
          [68, 79]
        ];
        el.anomaly = [
          [32, 45],
          [54, 68]
        ];
        el.normal = [
          [45, 54]
        ];
        var testCases = [{
            v: 80,
            c: 'error'
          },
          {
            v: 40,
            c: 'anomaly'
          },
          {
            v: 70,
            c: 'abnormal'
          },
          {
            v: 50,
            c: 'normal'
          }
        ];
        (function execute(index) {
          if (index == testCases.length) return done();
          var testCase = testCases[index];
          el.value = testCase.v;
          setTimeout(function() {
            var chart = Polymer.dom(el.root).querySelector('.chart-filled');

            if (Polymer.dom(el.root).querySelector('.chart-filled').classList) {
              assert.equal(chart.classList.contains(testCase.c), true);
            } else {
              var classes = chart.getAttribute('class').split(' ');
              assert.isAtLeast(classes.indexOf(testCase.c), 0);
            }

            execute(++index);
          }, 1000);
        })(0);
      }, 500);
    });

    test('Check position of Needle', function(done) {
      //wait for d3 render svg
      setTimeout(function() {
        el.min = 0;
        el.max = 100;
        el.value = 50;
        //wait for animation finished
        setTimeout(function() {
          assert.equal(Polymer.dom(el.root).querySelector('.needle').transform.animVal.getItem('angle').angle, -90);
          done();
        }, 1000)
      }, 500);
    });
  });
