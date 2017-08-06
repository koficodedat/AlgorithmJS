/// <reference path="../../typings/globals/node/index.d.ts" />
/// <reference path="../../typings/globals/mocha/index.d.ts" />

import assert = require('assert');
import {DictionaryImpl} from "../../src/data-structure/dictionary";
import {isEqual} from "../../src/util/isEqual";

describe('dictionary data structure test', () => {

    it('should test definition and functions of the dictionary structure with proper properties', () => {

        let dic = new DictionaryImpl();

        assert.equal(dic.isEmpty(),true);
        assert.equal(dic.size(),0);
        assert.equal(dic.hasKey('name'),false);
        assert.throws( () => { dic.hasKey({}) }, Error, 'Dictionary - keyToString() : Key type must be a simple type and not a complex object' );

        dic.add('name','Kofi Nedjoh');
        assert.equal(dic.isEmpty(),false);
        assert.equal(dic.size(),1);
        assert.equal(dic.hasKey('name'),true);
        assert.doesNotThrow( () => { dic.hasKey('name') }, Error );
        assert.equal('Kofi Nedjoh',dic.get('name'));
        assert.equal(undefined,dic.get('age'));

        dic.remove('name');
        assert.equal(dic.isEmpty(),true);
        assert.equal(dic.size(),0);

        dic.add(true,false);
        assert.equal(dic.isEmpty(),false);
        assert.equal(dic.size(),1);
        dic.remove('name');
        assert.equal(dic.isEmpty(),false);
        assert.equal(dic.size(),1);

        dic.add('name','Kofi Nedjoh');
        dic.add('height',`5'9`);
        assert.equal(dic.size(),3);
        assert.equal(isEqual(dic.keys(),[true,'name','height']),true);
        assert.equal(isEqual(dic.values(),[false,'Kofi Nedjoh',`5'9`]),true);
        assert.throws( () => { dic.setRestrict(2) }, Error, 'Current size of Dictionary is more than ${restrict}: 3 vs 2' );
        dic.remove('name');
        assert.doesNotThrow( () => { dic.setRestrict(2) }, Error );
        assert.equal(dic.size(),2);

        dic.clear();
        assert.equal(dic.size(),0);
        assert.equal(dic.isEmpty(),true);

    });

});