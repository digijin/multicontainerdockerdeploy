import module from 'module.js'
describe('module', () => {
    it('should be defined', () => {
        expect(module).toBeDefined();
    });
    it('should be a function that increments', () => {
        let result = module(1)
        expect(result).toBe(2);
    })
})