/*
 @since 1.0.25
 This is an implementation of Dictionary data structure.
 It implements:
    hasKey()
    add(..)
    remove(..)
    get(..)
    keys()
    values()
    clear()
    size()
    isEmpty()
    setRestrict(..)
 */

export interface Dictionary<K>{
    key: K,
    value: any
}

export class DictionaryImpl{

    private table: { [key: string] : Dictionary<number | string | boolean> };
    private restrict: number;
    private length: number;

    constructor(restrict?: number){
        this.table = {};
        this.restrict = restrict ? restrict : -1;
        this.length = 0;
    }

    hasKey(key: any): boolean{
        return this.table[ DictionaryImpl.keyToString( key ) ] !== undefined
    }

    add(key: any, value: any){

        if( this.restrict !== -1  && this.length === this.restrict ) throw new Error(`add(..) : Dictionary content has reached set limit ${this.restrict} `);

        if( !this.hasKey( key ) ) this.length++;

        this.table[ DictionaryImpl.keyToString( key ) ] = { key: key, value: value };
    }

    remove(key: any){
        if( !this.hasKey( key ) ) return;

        delete this.table[ DictionaryImpl.keyToString( key ) ];

        this.length--;
    }

    get(key: any): any{
        if( !this.hasKey( key ) ) return;

        return this.table[ DictionaryImpl.keyToString( key ) ].value;
    }

    keys(): any{
        const keyArray: any = [];

        for( const key in this.table ){
            keyArray.push( this.table[ DictionaryImpl.keyToString( key ) ].key );
        }

        return keyArray;
    }

    values(): any{
        const valueArray: any = [];

        for( const key in this.table ){
            valueArray.push( this.table[ DictionaryImpl.keyToString( key ) ].value );
        }

        return valueArray;
    }

    clear(){
        this.table = {};
        this.length = 0
    }

    size(): number{
        return this.length;
    }

    isEmpty(): boolean{
        return this.size() === 0;
    }

    setRestrict(restrict: number){
        if( this.length > restrict ) throw new Error(`Current size of Dictionary is more than ${restrict}: ${this.restrict} vs ${restrict}`)
        this.restrict = restrict;
    }

    private static keyToString(value: any): string{
        if( typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean' ) return value.toString();
        else throw new Error('Dictionary - keyToString() : Key type must be a simple type and not a complex object')
    }

}