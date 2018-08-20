import $ from 'jquery'
import a from './a.js'
import c from './c.js'
const s=()=>{
    a.init();
    a.cccc();
    c.init();
    console.log('s init')
    console.log($)
};
s();