<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;


class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $users = User::query();
        if($request->order && $request->order_by ){
            $order_by = $request->order_by;
            $order = $request->order;
            $users->orderBy($order_by, $order);
        }else{
            $users->orderBy('id','desc');
        }
        
        //dd($users->find('10001')->roles);
        if($request->name){
            $users = $users->where("name","like","%{$request->name}%");
        }
        if($request->email){
            $users = $users->where("email","like","%{$request->email}%");
        }    
        $users = $users->paginate(10)
        ->onEachSide(1);
        return Inertia::render('User/Index', [
            'users' => $users,
            'queryParams'=>$request->query()?:null,
        ]);
        
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        //
    }
}
