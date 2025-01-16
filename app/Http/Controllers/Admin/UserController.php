<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\User\StoreRequest;
use App\Http\Requests\Admin\User\UpdateRequest;
use App\Models\Agency;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        return view('admin.user.index', [
            'users' => User::orderBy('id', 'desc')->paginate(10),
            ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

        $agencies = Agency::all();
        $roles = User::getRoles();
        return view('admin.user.create', [
            'roles' => $roles,
            'agencies' => $agencies
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {

        $data = $request->validated();

        $data['password'] = Hash::make($data['password']);

        if ($request->hasFile('avatar')) {
            $avatar = $request->file('avatar');
            $data['avatar'] = Storage::put('avatars', $avatar);
            $data['avatar'] = str_replace('avatars/', '', $data['avatar']);
        }

        User::create($data);

        return to_route('admin.users.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        $roles = User::getRoles();

        return view('admin.user.edit', [
            'roles' => $roles,
            'user' => $user
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request, User $user)
    {
        $data = $request->validated();

        if ($request->filled('password')) {
            $data['password'] = Hash::make($request->password);
        } else {
            unset($data['password']);
        }

        if ($request->hasFile('avatar')) {

            // Удаляем старый аватар, если новый загружается
            if ($user->avatar) {
                Storage::delete('avatars/' . $user->avatar);
            }

            $avatar = $request->file('avatar');
            $data['avatar'] = Storage::put('avatars', $avatar);
            $data['avatar'] = str_replace('avatars/', '', $data['avatar']);
        }

        $user->update($data);

        return to_route('admin.users.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        if ($user->avatar) {
            Storage::delete('avatars/' . $user->avatar);
        }

        $user->delete();

        return to_route('admin.users.index');
    }
}
