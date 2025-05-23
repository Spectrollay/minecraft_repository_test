/*
 * Copyright © 2020. Spectrollay
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

function hide_mask() {
    const loading_mask = document.getElementById('loading_mask');
    // 1.2s后隐藏遮罩
    setTimeout(() => {
        loading_mask.style.opacity = '0';
        setTimeout(() => {
            loading_mask.style.display = 'none';
        }, 800);
    }, 1200);
}

// 6秒后强制隐藏遮罩
let count = 6;
const secondInterval = setInterval(() => {
    count--;
    if (count <= 0) {
        clearInterval(secondInterval);
        hide_mask();
    }
}, 1000);

// DOM加载完成时尝试隐藏遮罩
document.addEventListener('DOMContentLoaded', () => {
    hide_mask();
});