import passport = require('passport');
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import User, { IUser } from '../models/User';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy } from 'passport-github2';

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET as string,
    },
    async (jwt_payload: any, done: (error: any, user?: any) => void) => {
      try {
        const user = await User.findById(jwt_payload.id);
        if (user) return done(null, user);
        return done(null, false);
      } catch (err) {
        return done(err, false);
      }
    }
  )
);

// Google OAuth Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID as string,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
  callbackURL: '/api/auth/google/callback',
}, async (
  accessToken: string,
  refreshToken: string,
  profile: any,
  done: (error: any, user?: any) => void
) => {
  try {
    const email = profile.emails && profile.emails[0].value;
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        name: profile.displayName,
        email,
        password: '',
        profilePhoto: profile.photos && profile.photos[0]?.value,
        isPublic: true,
      });
    }
    return done(null, user);
  } catch (err) {
    return done(err, undefined);
  }
}));

// GitHub OAuth Strategy
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID as string,
  clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
  callbackURL: '/api/auth/github/callback',
}, async (
  accessToken: string,
  refreshToken: string,
  profile: any,
  done: (error: any, user?: any) => void
) => {
  try {
    const email = profile.emails && profile.emails[0].value;
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        name: profile.displayName || profile.username,
        email,
        password: '',
        profilePhoto: profile.photos && profile.photos[0]?.value,
        isPublic: true,
      });
    }
    return done(null, user);
  } catch (err) {
    return done(err, undefined);
  }
}));

export default passport; 