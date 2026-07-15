<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\HobbyRequest;
use App\Services\TsData\HobbiesDataFile;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminHobbyController extends Controller
{
    public function index(HobbiesDataFile $hobbies): Response
    {
        return Inertia::render('admin/hobbies/Index', [
            'hobbies' => $hobbies->hobbies(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/hobbies/Form', [
            'hobby' => null,
        ]);
    }

    public function edit(HobbiesDataFile $hobbies, string $hobby): Response
    {
        return Inertia::render('admin/hobbies/Form', [
            'hobby' => $hobbies->hobby($hobby),
        ]);
    }

    public function store(HobbyRequest $request, HobbiesDataFile $hobbies): RedirectResponse
    {
        $hobbies->addHobby($request->validated());

        return redirect()->route('admin.hobbies.index')->with('status', 'Hobby added.');
    }

    public function update(HobbyRequest $request, HobbiesDataFile $hobbies, string $hobby): RedirectResponse
    {
        $hobbies->updateHobby($hobby, $request->validated());

        return redirect()->route('admin.hobbies.index')->with('status', 'Hobby saved.');
    }

    public function destroy(HobbiesDataFile $hobbies, string $hobby): RedirectResponse
    {
        $hobbies->deleteHobby($hobby);

        return redirect()->route('admin.hobbies.index')->with('status', 'Hobby deleted.');
    }

    public function reorder(Request $request, HobbiesDataFile $hobbies): RedirectResponse
    {
        $order = $request->validate([
            'order' => ['required', 'array'],
            'order.*' => ['string'],
        ])['order'];

        $hobbies->reorder($order);

        return redirect()->route('admin.hobbies.index')->with('status', 'Hobby order saved.');
    }
}
