<?php

namespace App\Http\Controllers;

use App\ProductType;
use Illuminate\Http\Request;

class ProductTypesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $prod_types = ProductType::all();
        return view('product_types.index')->with('prod_types', $prod_types);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'type' => 'required'
        ]);

        $new_prod_type = $request->input('type');

        $find_prod_type = ProductType::where('type', $new_prod_type);

        if ($find_prod_type->count() >= 1) {
            return redirect('/product_types')->with('prod_type', json_encode([
                'message' => 'Product type already exists.',
                'type' => 'warning'
            ]));
        } else {
            
            $prod_type = new ProductType;
            $prod_type->type = $new_prod_type;
            $prod_type->save();

            return redirect('/product_types')->with('prod_type', json_encode([
                'message' => 'Product type successfully saved!',
                'type' => 'success'
            ]));
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'type' => 'required'
        ]);

        $update_prod_type = $request->input('type');

        $find_prod_type = ProductType::where('type', $update_prod_type)->get();

        if ($find_prod_type->count() >= 1) {
            return redirect('/product_types')->with('prod_type', json_encode([
                'message' => 'Product type already exists.',
                'type' => 'warning'
            ]));
        } else {
            $prod_type = ProductType::find($id);
            $prod_type->type = $update_prod_type;
            $prod_type->save();

            return redirect('/product_types')->with('prod_type', json_encode([
                'message' => 'Product type successfully updated!',
                'type' => 'success'
            ]));
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
