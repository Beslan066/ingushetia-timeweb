<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Event\StoreRequest;
use App\Http\Requests\Admin\Event\UpdateRequest;
use App\Models\Event;
use Illuminate\Http\Request;

class EventController extends Controller
{
    public function index()
    {

        $events = Event::paginate(20);

        return view('admin.event.index', compact('events'));
    }

    public function create()
    {
        return view('admin.event.create');
    }

    public function store(StoreRequest $request)
    {
        $data = $request->validated();

        $event = Event::create($data);

        return redirect()->route('admin.events.index');
    }

    public function edit(Event $event)
    {
        return view('admin.event.edit', compact('event'));
    }

    public function update(UpdateRequest $request, Event $event)
    {
        $data = $request->validated();
        $event->update($data);

        return redirect()->route('admin.events.index')->with('success', 'News updated successfully');
    }

    public function destroy(Event $event)
    {
        $event->delete();

        return to_route('admin.events.index');

    }
}
