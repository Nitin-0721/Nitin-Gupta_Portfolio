import Profile from '../models/Profile.js';

/**
 * Get the centralized profile document.
 * If none exists, returns an empty object template rather than failing.
 * GET /api/profile
 */
export const getProfile = async (req, res, next) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      // Return a temporary blank profile structure if not yet seeded
      profile = {
        name: 'Nitin Gupta',
        professionalTitle: 'Software Developer',
        bio: 'Welcome to my portfolio!',
        email: 'admin@example.com',
        location: 'India',
        profileImage: '',
        resumeUrl: '',
        githubUrl: '',
        linkedinUrl: '',
        leetcodeUrl: '',
        codechefUrl: ''
      };
    }

    res.status(200).json({
      success: true,
      data: profile
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update the centralized profile document (or create if not existing).
 * PUT /api/profile
 */
export const updateProfile = async (req, res, next) => {
  try {
    let profile = await Profile.findOne();

    if (profile) {
      profile = await Profile.findByIdAndUpdate(
        profile._id,
        { $set: req.body },
        { new: true, runValidators: true }
      );
    } else {
      profile = await Profile.create(req.body);
    }

    res.status(200).json({
      success: true,
      data: profile
    });
  } catch (error) {
    next(error);
  }
};
