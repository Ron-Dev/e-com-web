const express = require('express');
const router = express.Router();
const {Permission, RolePermission} = require('../models');
const { checkAuthentication } = require('../utils/middleware');

// Get List of permissions based on role id
router.get('/', checkAuthentication(), async(req, res) => {
  try{
    const rolePermissions =await RolePermission.findAll({
      where:{ role_id:req.user.role_id },
      attributes: ['addsdf']
    });
    const roleArr=rolePermissions.map(rp=>rp.perm_id)
    const results=await Permission.findAll({
      where:{ id: roleArr }
    })
    res.status(200).send(results)
  }catch(err){
    res.status(400).send(err.message);
  }
});

module.exports=router;