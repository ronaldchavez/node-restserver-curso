const jwt = require('jsonwebtoken');

// ================== //
//   Verifica token   //
// ================== //

let verificaToken = ( req, res, next ) => {

	let token = req.get('autorizacion');

	jwt.verify( token, process.env.SEED, (err, decoded) => {

		if(err){
			return res.status(401).json({
				ok: false,
				err
			});	
		}

		req.usuario = decoded.usuario;
		console.log(req.usuario);
		next();

	});

}

// ==================== //
//  Verifica adminRole  //
// ==================== //

let verificaAdminRole = ( req, res, next ) => {

	let usuario = req.usuario;

	if(usuario.role != ADMIN_ROLE){
		return res.status(400).json({
				ok: false,
				err: {
					message: 'El usuario no es administrador'
				}
			});	
	}else{
	next();	
	}

	

}

module.exports = {
	verificaToken,
	verificaAdminRole
}