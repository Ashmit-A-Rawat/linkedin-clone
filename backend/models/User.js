import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,  // This creates the index automatically
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters']
  },
  profilePicture: {
    type: String,
    default: 'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name='
  },
  headline: {
    type: String,
    default: '',
    trim: true
  },
  industry: {
    type: String,
    default: '',
    trim: true
  },
  location: {
    type: String,
    default: '',
    trim: true
  },
  skills: [{
    type: String,
    trim: true
  }],
  bio: {
    type: String,
    default: '',
    maxlength: 500
  },
  experienceLevel: {
    type: String,
    enum: ['Student', 'Entry Level', 'Mid Level', 'Senior Level', 'Executive', 'Founder', ''],
    default: ''
  },
  connections: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  lastSeen: {
    type: Date,
    default: Date.now
  },
  isOnline: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// NO duplicate index definition here - removed userSchema.index({ email: 1 });

// Hash password before saving
userSchema.pre('save', async function(next) {
  // Only hash if password is modified
  if (!this.isModified('password')) {
    return next();
  }
  
  try {
    // Generate salt and hash password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
userSchema.methods.correctPassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    console.error('Password comparison error:', error);
    return false;
  }
};

// Update profile picture default with name
userSchema.pre('save', function(next) {
  if (!this.profilePicture || this.profilePicture === 'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=') {
    this.profilePicture = `https://ui-avatars.com/api/?background=0a66c2&color=fff&name=${encodeURIComponent(this.name)}`;
  }
  next();
});

export default mongoose.model('User', userSchema);