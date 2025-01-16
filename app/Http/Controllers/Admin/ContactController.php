<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Contact\UpdateRequest;
use App\Http\Requests\Admin\Contact\StoreRequest;
use App\Models\Agency;
use App\Models\Contact;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use PHPUnit\TextUI\Configuration\Php;


class ContactController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {


        $contacts = Contact::query()->where('user_id', '=',auth()->user()->id)->orderBy('id', 'desc')->paginate(10);

        return view('admin.contact.index', compact('contacts' ));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

        $authors = User::query()->where('role', 10)->get();


        return view('admin.contact.create', compact('authors'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        $data = $request->validated();


        $contacts = Contact::create($data);

        return redirect()->route('admin.contacts.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Contact $contact)
    {

        $authors = User::query()->where('role', 10)->get();

        return view('admin.contact.edit', compact('contact', 'authors'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request, Contact $contact)
    {
        $data = $request->validated();
        $contact->update($data);

        return redirect()->route('admin.contacts.index')->with('success', 'Contact updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Contact $contact)
    {
        $contact->delete();

        return to_route('admin.contacts.index');
    }
}
