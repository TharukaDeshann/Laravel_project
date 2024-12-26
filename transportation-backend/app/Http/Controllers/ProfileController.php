<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Str;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }
    public function profile(User $user){
        return inertia("User/Profile", [
            'user' => new UserResource($user),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
{
    $user = $request->user();

    // Fill the user data with validated inputs
    $user->fill($request->validated());

    // Handle image upload
    $image = $request->file('image');
    if ($image) {
        // Delete the old image if it exists
        if ($user->image_path) {
            Storage::disk('public')->deleteDirectory(dirname($user->image_path));
        }

        // Store the new image and update the path
        $path = $image->store('user/' . Str::random(), 'public');
        $user->image_path = $path;
    }

    // Reset email verification if email is changed
    if ($user->isDirty('email')) {
        $user->email_verified_at = null;
    }

    // Save updated user information
    $user->save();

    // Redirect to profile edit page
    return Redirect::route('profile.edit')->with('status', 'Profile updated successfully.');
}



    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
