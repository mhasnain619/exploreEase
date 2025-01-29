import { GitHub, Mail, Twitter } from '@mui/icons-material';
import React from 'react';
import { BiMapPin } from 'react-icons/bi';
// import { Card, CardContent, CardHeader } from '@/components/ui/card';

const ProfileCard = ({ profile }) => {
    if (!profile) return null; // Render nothing if profile is empty

    return (
        <div className="max-w-md shadow-lg bg-white">
            <div className="flex flex-col gap-4">
                <div className="flex items-start gap-4">
                    <div className="h-2 w-2 mt-2 rounded-full bg-orange-500" />
                    <h2 className="text-xl font-semibold">{profile.name}</h2>
                </div>

                <div className="flex gap-4">
                    <img
                        src={profile.avatar_url}
                        alt="Profile"
                        className="w-24 h-24 rounded-lg object-cover"
                    />

                    <div className="flex flex-col gap-2">
                        <p className="text-gray-600">
                            {profile.bio || "No bio available"}
                        </p>

                        <div className="flex items-center gap-2 text-gray-600">
                            <BiMapPin className="w-4 h-4" />
                            <span>{profile.location || "Not available"}</span>
                        </div>

                        <div className="flex items-center gap-2 text-gray-600">
                            <Mail className="w-4 h-4" />
                            <span>{profile.email || "Not available"}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <div className="space-y-4">
                    <div>
                        <p className="text-gray-600 mb-2">Social Links:</p>
                        <div className="flex gap-4">
                            <a href={profile.twitter_username ? `https://twitter.com/${profile.twitter_username}` : '#'}>
                                <Twitter className="w-5 h-5 text-gray-600" />
                            </a>
                            <a href={profile.html_url}>
                                <GitHub className="w-5 h-5 text-gray-600" />
                            </a>
                        </div>
                    </div>

                    <div>
                        <p className="text-gray-600 mb-2">Portfolio:</p>
                        <a href={profile.blog || "#"} className="text-blue-600 hover:underline">
                            Portfolio
                        </a>
                    </div>

                    <div className="flex justify-between pt-4 border-t">
                        <div className="text-center">
                            <p className="text-xl font-semibold">{profile.public_repos}</p>
                            <p className="text-gray-600 text-sm">Public Repos</p>
                        </div>
                        <div className="text-center">
                            <p className="text-xl font-semibold">{profile.followers}</p>
                            <p className="text-gray-600 text-sm">Followers</p>
                        </div>
                        <div className="text-center">
                            <p className="text-xl font-semibold">{profile.following}</p>
                            <p className="text-gray-600 text-sm">Following</p>
                        </div>
                    </div>

                    <div className="mt-4 p-2 bg-gray-100 rounded">
                        <p className="text-gray-600 text-sm font-mono break-all">
                            {profile.repos_url}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;
