const mongoose = require('mongoose');
const { Schema } = mongoose;

// Subject Schemas
const JrKgSubjectSchema = new Schema({
  ganit: { type: Number, required: true },
  samanya_gyan: { type: Number, required: true },
  bhasha: { type: Number, required: true },
  angreji: { type: Number, required: true },
});

const SrKgSubjectSchema = new Schema({
  ganit: { type: Number, required: true },
  samanya_gyan: { type: Number, required: true },
  bhasha: { type: Number, required: true },
  angreji: { type: Number, required: true },
});

const Class1SubjectSchema = new Schema({
  ganit: { type: Number, required: true },
  angreji: { type: Number, required: true },
  bhasha: { type: Number, required: true },
  hindi: { type: Number, required: true },
});

const Class2SubjectSchema = new Schema({
  ganit: { type: Number, required: true },
  angreji: { type: Number, required: true },
  bhasha: { type: Number, required: true },
  hindi: { type: Number, required: true },
});

const Class3SubjectSchema = new Schema({
  ganit: { type: Number, required: true },
  kalshor: { type: Number, required: true },
  hindi: { type: Number, required: true },
  angreji: { type: Number, required: true },
  aaspas: { type: Number, required: true },
});

const Class4SubjectSchema = new Schema({
  ganit: { type: Number, required: true },
  kuhu: { type: Number, required: true },
  hindi: { type: Number, required: true },
  angreji: { type: Number, required: true },
  aaspas: { type: Number, required: true },
});

const Class5SubjectSchema = new Schema({
  ganit: { type: Number, required: true },
  kekarav: { type: Number, required: true },
  hindi: { type: Number, required: true },
  angreji: { type: Number, required: true },
  aaspas: { type: Number, required: true },
});

const Class6SubjectSchema = new Schema({
  ganit: { type: Number, required: true },
  palash: { type: Number, required: true },
  vigyan: { type: Number, required: true },
  sanskrit: { type: Number, required: true },
  hindi: { type: Number, required: true },
  samaj: { type: Number, required: true },
});

const Class7SubjectSchema = new Schema({
  ganit: { type: Number, required: true },
  gujarati: { type: Number, required: true },
  vigyan: { type: Number, required: true },
  sanskrit: { type: Number, required: true },
  hindi: { type: Number, required: true },
  samaj: { type: Number, required: true },
});

const Class8SubjectSchema = new Schema({
  ganit: { type: Number, required: true },
  gujarati: { type: Number, required: true },
  vigyan: { type: Number, required: true },
  sanskrit: { type: Number, required: true },
  hindi: { type: Number, required: true },
  samaj: { type: Number, required: true },
});

// Round Schema
const RoundSchema = new Schema({
  roundNumber: { type: Number, required: true },
  subjects: { type: Object, required: true },  // This will hold the subject-specific data for the round
  rank: { type: Number, required: true },
 
});

// Student Result Schema
const createStudentSchema = (standard, subjectSchema) => {
  return new Schema({
    name: { type: String, required: true },
    rollNumber: { type: String, required: true, unique: true },
    rounds: [RoundSchema],
    classRank: { type: Number, required: true },
    standardRank: { type: Number, required: true },
    maxMarksInRound: { type: Number, required: true },
    TestName: { type: String, required: true },

  });
};

// Define Models for Each Standard
const JrKgSchema = createStudentSchema('JrKg', JrKgSubjectSchema);
const SrKgSchema = createStudentSchema('SrKg', SrKgSubjectSchema);
const Class1Schema = createStudentSchema('Class1', Class1SubjectSchema);
const Class2Schema = createStudentSchema('Class2', Class2SubjectSchema);
const Class3Schema = createStudentSchema('Class3', Class3SubjectSchema);
const Class4Schema = createStudentSchema('Class4', Class4SubjectSchema);
const Class5Schema = createStudentSchema('Class5', Class5SubjectSchema);
const Class6Schema = createStudentSchema('Class6', Class6SubjectSchema);
const Class7Schema = createStudentSchema('Class7', Class7SubjectSchema);
const Class8Schema = createStudentSchema('Class8', Class8SubjectSchema);

// Export All Schemas
module.exports = {
  JrKgResult: mongoose.model('JrKgResult', JrKgSchema),
  SrKgResult: mongoose.model('SrKgResult', SrKgSchema),
  Class1Result: mongoose.model('Class1Result', Class1Schema),
  Class2Result: mongoose.model('Class2Result', Class2Schema),
  Class3Result: mongoose.model('Class3Result', Class3Schema),
  Class4Result: mongoose.model('Class4Result', Class4Schema),
  Class5Result: mongoose.model('Class5Result', Class5Schema),
  Class6Result: mongoose.model('Class6Result', Class6Schema),
  Class7Result: mongoose.model('Class7Result', Class7Schema),
  Class8Result: mongoose.model('Class8Result', Class8Schema),
};
