// ...seu código de import...

class AuditoriaService {

  // ...outros métodos...

  // Método para buscar auditorias com filtros e pesquisa por nome
  async getAuditoria({
    page = 1,
    limit = 10,
    search,
    lojaId,
    usuarioId,
    criadorId,
    data,
    horaInicial,
    horaFinal,
    createdBefore,
    createdAfter,
    updatedBefore,
    updatedAfter,
    sort,
  }) {
    page = parseInt(page);
    limit = parseInt(limit);

    let where = {};
    let order = [];

    // Filtros simples
    if (lojaId) where.lojaId = lojaId;
    if (usuarioId) where.usuarioId = usuarioId;
    if (criadorId) where.criadorId = criadorId;
    if (data) where.data = data;
    if (horaInicial) where.horaInicial = horaInicial;
    if (horaFinal) where.horaFinal = horaFinal;

    // Filtros por datas de criação e atualização
    if (createdBefore) {
      where.createdAt = { ...(where.createdAt || {}), [Op.lte]: createdBefore };
    }
    if (createdAfter) {
      where.createdAt = { ...(where.createdAt || {}), [Op.gte]: createdAfter };
    }
    if (updatedBefore) {
      where.updatedAt = { ...(where.updatedAt || {}), [Op.lte]: updatedBefore };
    }
    if (updatedAfter) {
      where.updatedAt = { ...(where.updatedAt || {}), [Op.gte]: updatedAfter };
    }

    // Ordenação (ex: sort=data:desc,horaInicial:asc)
    if (sort) {
      order = sort.split(',').map((item) => item.split(':'));
    } else {
      order = [['data', 'DESC']]; // padrão
    }

    const offset = (page - 1) * limit;

    // =========== AJUSTE PARA PESQUISA POR TEXTO ============= //
    // O segredo é usar required: false no include e só adicionar where se search existir
    const include = [
      {
        model: Loja,
        as: 'loja',
        attributes: ['id', 'name'],
        ...(search ? { where: { name: { [Op.like]: `%${search}%` } }, required: false } : {}),
      },
      {
        model: Usuario,
        as: 'usuario',
        attributes: ['id', 'name'],
        ...(search ? { where: { name: { [Op.like]: `%${search}%` } }, required: false } : {}),
      },
      {
        model: Usuario,
        as: 'criador',
        attributes: ['id', 'name'],
        ...(search ? { where: { name: { [Op.like]: `%${search}%` } }, required: false } : {}),
      },
    ];

    const auditoria = await Auditoria.findAndCountAll({
      where,
      order,
      limit,
      offset,
      attributes: [
        'id', 'lojaId', 'usuarioId', 'criadorId',
        'data', 'horaInicial', 'horaFinal',
        'createdAt', 'updatedAt'
      ],
      include,
      distinct: true, // importante para não contar registros duplicados!
    });

    return {
      auditoria: auditoria.rows,
      totalItems: auditoria.count,
      totalPages: Math.ceil(auditoria.count / limit),
      currentPage: page,
    };
  }

  // ...demais métodos, sem alteração...

}

export default new AuditoriaService();
