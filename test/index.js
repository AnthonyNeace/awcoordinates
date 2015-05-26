var should = require('chai').should(),
    awcoordinates = require('../index'),
	find = awcoordinates.find;
	
describe('#find', function() {
  it('returns a single iterate when it finds one coordinate string.', function() {
    var result = find('This string contains: aw 100s 100e');
    result.should.have.length(1);
    result[0].should.equal('aw 100s 100e');		
  });
  
  it('returns multiple iterates when it finds multiple coordinate strings.', function() {
    var result = find('This string contains aw 100s 100e and awteen 0n 0e 100a 360');
    result.should.have.length(2);
    result[0].should.equal('aw 100s 100e');	
    result[1].should.equal('awteen 0n 0e 100a 360');	
  });  
  
  it('handles coordinates matching: <worldname> <N/S position> <E/W position>', function() {
    find('This string contains aw 100s 100e').should.have.length(1);
    find('This string contains aw 100s 100e')[0].should.equal('aw 100s 100e');	
  });    
  
  it('handles coordinates matching: <worldname> <N/S position> <E/W position> <altitude as integer>', function() {
    find('This string contains awteen 0n 0w 10a').should.have.length(1);
    find('This string contains awteen 0n 0w 10a')[0].should.equal('awteen 0n 0w 10a');	
  });     

  it('handles coordinates matching: <worldname> <N/S position> <E/W position> <altitude as decimal>', function() {
    find('This string contains awteen 0n 0w 0.25a').should.have.length(1);
    find('This string contains awteen 0n 0w 0.25a')[0].should.equal('awteen 0n 0w 0.25a');	
  });   

  it('handles coordinates matching: <worldname> <N/S position> <E/W position> <altitude> <position>', function() {
    find('This string contains CofMeta 123N 456W 10a 180').should.have.length(1);
    find('This string contains CofMeta 123N 456W 10a 180')[0].should.equal('CofMeta 123N 456W 10a 180');	
  });   
  
  it('is case insensitive.', function() {
    find('THIS STRING CONTAINS MARS 100n 250E 10A 90').should.have.length(1);
    find('THIS STRING CONTAINS MARS 100n 250E 10A 90')[0].should.equal('MARS 100n 250E 10A 90');	
  }); 

  it('handles worldnames with special characters.', function() {
    var result = find('We are going to @Mart 10n 10w 0.5a 45 today!')
	result.should.have.length(1);
    result[0].should.equal('@Mart 10n 10w 0.5a 45');	
  });   
  
  it('enforce that worldnames are at least two characters long.', function() {
    var result = find('This world should not be found a 1s 1e 0a anywhere!')
	result.should.have.length(0);	
  });     
});