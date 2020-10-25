<?php

namespace App\Http\Controllers;

use App\Product;
use App\Brand;
use App\ProductType;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class ProductsController extends Controller
{
	/**
	 * Display a listing of the resource.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function index()
	{
		$products = DB::table('products')
						->join('product_types', 'products.type_id', '=', 'product_types.id')
						->join('brands', 'products.brand_id', '=', 'brands.id')
						->select('products.*', 'product_types.type', 'brands.brand_name')
						->get();
						
		$prod_types = ProductType::all();
		$brands = Brand::all();
		
		$array_prod_types = ['' => '-Select Item-'];
		$array_brands = ['' => '-Select Item-'];

		foreach ($prod_types as $value) {
		    $array_prod_types[$value->id] = $value->type;
		}

		foreach ($brands as $value) {
		    $array_brands[$value->id] = $value->brand_name;
		}

		return view('products.index')->with([
			'products' => $products,
			'brands' => $array_brands,
			'product_types' => $array_prod_types
		]);
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
			'prod_name' => 'required|max:255',
			'type_id' => 'required',
			'stock' => 'required',
			'price' => 'required',
			'brand_id'=> 'required'
		]);

		$req = $request->all();      

		$find_prod_type = ProductType::where('id', $req['type_id'])->get();
		$find_brand = Brand::where('id', $req['brand_id'])->get();
		$find_product = Product::where('prod_name', $req['prod_name'])->get();

		if ($find_product->count() >= 1) {
			// error 
			// product already exists
		} else if ($find_brand->count() === 1 && $find_prod_type->count() === 1) {
			// product does not exist 
			// and brand and prod type exists
			$product = new Product;
			$product->prod_name = $req['prod_name'];
			$product->type_id = $req['type_id'];
			$product->stock = $req['stock'];
			$product->price = $req['price'];
			$product->brand_id = $req['brand_id'];
			$product->save();

			return redirect('/products');
		}
		// get ids of foreign keys
		// check if exists
		// create product
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
		//
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
