## API Endpoints

Esta es una guía detallada de los endpoints del API, agrupados por módulo. Todas las rutas comienzan con el prefijo `/api`.

#### Auth (`/api/auth`)
*   `POST /login` - Para iniciar sesión.
*   `POST /registro` - Registra un nuevo usuario (requiere rol de Administrador).
*   `GET /perfil` - Obtiene el perfil del usuario autenticado.

#### Empleados (`/api/empleados`)
*   `GET /obtenerempleados` - Obtiene la lista de todos los empleados.
*   `POST /crearempleado` - Crea un nuevo empleado.
*   `GET /obtener/:id_empleado` - Obtiene un empleado específico por su ID.
*   `PUT /actualizar/:id_empleado` - Actualiza un empleado existente.
*   `DELETE /eliminar/:id_empleado` - Elimina un empleado.

#### Puestos (`/api/puestos`)
*   `GET /obtenerpuestos` - Obtiene todos los puestos.
*   `POST /crearpuesto` - Crea un nuevo puesto.
*   `GET /:id_puesto` - Obtiene un puesto por ID.
*   `PUT /:id_puesto` - Actualiza un puesto.
*   `DELETE /:id_puesto` - Elimina un puesto.

#### Dependencias (`/api/dependencias`)
*   `GET /obtenerdependencias` - Obtiene todas las relaciones de dependencia.
*   `POST /creardependencia` - Crea una nueva relación de dependencia.
*   `GET /:id_dependencia` - Obtiene una dependencia por ID.
*   `PUT /:id_dependencia` - Actualiza una relación de dependencia.
*   `DELETE /:id_dependencia` - Elimina una relación de dependencia.

#### Vacantes (`/api/vacantes`)
*   `GET /obtenervacantes` - Obtiene todas las vacantes.
*   `POST /crearvacantes` - Crea una nueva vacante.
*   `GET /:id_vacante` - Obtiene una vacante por ID.
*   `PUT /:id_vacante` - Actualiza una vacante.
*   `DELETE /:id_vacante` - Elimina una vacante.

#### Candidatos (`/api/candidatos`)
*   `GET /obtenercandidatos` - Obtiene todos los candidatos.
*   `POST /crearcandidato` - Crea un nuevo candidato.
*   `GET /obtener/:id_candidato` - Obtiene un candidato por ID.
*   `PUT /actualizar/:id_candidato` - Actualiza un candidato.
*   `DELETE /eliminar/:id_candidato` - Elimina un candidato.

#### Aplicaciones a Vacantes (`/api/aplicaciones`)
*   `GET /obtener-aplicaciones` - Obtiene todas las aplicaciones.
*   `POST /crearaplicacion` - Crea una nueva aplicación.
*   `GET /obtener/:id_aplicacion` - Obtiene una aplicación por ID.
*   `PUT /actualizar/:id_aplicacion` - Actualiza el estado de una aplicación.
*   `DELETE /eliminar/:id_aplicacion` - Elimina una aplicación.

#### Contratos (`/api/contratos`)
*   `GET /obtener-todos` - Obtiene todos los contratos.
*   `POST /crear` - Crea un nuevo contrato.
*   `GET /obtener/:id_contrato` - Obtiene un contrato por ID.
*   `PUT /actualizar/:id_contrato` - Actualiza un contrato.
*   `DELETE /eliminar/:id_contrato` - Elimina un contrato.

#### Nómina (`/api/nomina`)
*   `GET /obtenernominas` - Obtiene todos los registros de nómina.
*   `POST /crearnomina` - Crea un nuevo registro de nómina.
*   `GET /:id_nomina` - Obtiene un registro de nómina por ID.
*   `PUT /:id_nomina` - Actualiza un registro de nómina.
*   `DELETE /:id_nomina` - Elimina un registro de nómina.

#### Vacaciones (`/api/vacaciones`)
*   `GET /obtenervacaciones` - Obtiene todas las solicitudes de vacaciones.
*   `POST /crearvacacion` - Crea una nueva solicitud de vacaciones.
*   `GET /:id_vacacion` - Obtiene una solicitud por ID.
*   `PUT /:id_vacacion` - Actualiza una solicitud.
*   `DELETE /:id_vacacion` - Elimina una solicitud.

#### Bienestar (Programas) (`/api/bienestar`)
*   `GET /obtenertodo-bienestar` - Obtiene todos los programas de bienestar.
*   `POST /crearbienestar` - Crea un nuevo programa.
*   `GET /obtener/:id_bienestar` - Obtiene un programa por ID.
*   `PUT /actualizar/:id_bienestar` - Actualiza un programa.
*   `DELETE /eliminar/:id_bienestar` - Elimina un programa.

#### Evaluaciones de Desempeño (`/api/evaluaciones`)
*   `GET /obtenerevaluaciones` - Obtiene todas las evaluaciones.
*   `POST /crearevaluacion` - Crea una nueva evaluación.
*   `GET /:id_evaluacion` - Obtiene una evaluación por ID.
*   `PUT /:id_evaluacion` - Actualiza una evaluación.
*   `DELETE /:id_evaluacion` - Elimina una evaluación.

#### Detalles de Evaluación (`/api/detalles-evaluacion`)
*   `GET /obtenerdetalleevaluacion` - Obtiene los detalles de una evaluación específica.
*   `POST /creardetalleevaluacion` - Añade un detalle a una evaluación.
*   `GET /:id_detalle` - Obtiene un detalle por ID.
*   `PUT /:id_detalle` - Actualiza un detalle.
*   `DELETE /:id_detalle` - Elimina un detalle.

#### Criterios de Evaluación (`/api/criterios`)
*   `GET /obtenercriterios` - Obtiene todos los criterios.
*   `POST /crearcriterio` - Crea un nuevo criterio.
*   `GET /:id_criterio` - Obtiene un criterio por ID.
*   `PUT /:id_criterio` - Actualiza un criterio.
*   `DELETE /:id_criterio` - Elimina un criterio.

#### Carreras (`/api/carreras`)
*   `GET /obtener-todas` - Obtiene todas las carreras.
*   `POST /crear` - Crea una nueva carrera.
*   `GET /obtener/:id_carrera` - Obtiene una carrera por ID.
*   `PUT /actualizar/:id_carrera` - Actualiza una carrera.
*   `DELETE /eliminar/:id_carrera` - Elimina una carrera.

#### Dashboard (`/api/dashboard`)
*   `GET /dashboardestadisticas` - Obtiene estadísticas generales.
*   `GET /dashboardresumen` - Obtiene un resumen del sistema.

#### Mantenimiento (`/api/mantenimiento`)
*   `GET /obtebertodoslosmantenimientos/usuarios` - Obtiene todos los usuarios.
*   `POST /crearmantenimiento/usuarios` - Crea un nuevo usuario.
*   `PUT /usuarios/:id_usuario` - Actualiza un usuario.
*   `DELETE /usuarios/:id_usuario` - Elimina un usuario.
*   `GET /auditoria` - Obtiene los registros de auditoría.

### base de datos en la que esta basado los enpoints
*  Roles
CREATE TABLE public.roles (
    id_rol serial PRIMARY KEY,
    nombre_rol varchar(50) UNIQUE NOT NULL
);

-- Usuarios
CREATE TABLE public.usuarios (
    id_usuario serial PRIMARY KEY,
    nombre_usuario varchar(50) UNIQUE NOT NULL,
    correo varchar(100) UNIQUE NOT NULL,
    contrasena_hash text NOT NULL,
    id_rol integer NOT NULL REFERENCES public.roles(id_rol),
    fecha_creacion timestamp DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion timestamp,
    creado_por integer REFERENCES public.usuarios(id_usuario),
    actualizado_por integer REFERENCES public.usuarios(id_usuario),
    activo boolean DEFAULT true
);

-- Auditoría
CREATE TABLE public.auditoria (
    id_log serial PRIMARY KEY,
    tabla_afectada varchar(100),
    id_registro_text text,
    campo_modificado text,
    valor_anterior text,
    valor_nuevo text,
    accion varchar(50),
    usuario integer REFERENCES public.usuarios(id_usuario),
    fecha timestamptz DEFAULT CURRENT_TIMESTAMP,
    descripcion text
);

-- Carreras
CREATE TABLE public.carreras (
    id_carrera serial PRIMARY KEY,
    nombre_carrera varchar(100) UNIQUE NOT NULL,
    creado_por integer REFERENCES public.usuarios(id_usuario),
    actualizado_por integer REFERENCES public.usuarios(id_usuario),
    fecha_creacion timestamp DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion timestamp,
    activo boolean DEFAULT true
);

-- Puestos
CREATE TABLE public.puestos (
    id_puesto serial PRIMARY KEY,
    nombre_puesto varchar(100) UNIQUE NOT NULL,
    salario_base numeric(10,2) NOT NULL,
    id_carrera integer REFERENCES public.carreras(id_carrera),
    creado_por integer REFERENCES public.usuarios(id_usuario),
    actualizado_por integer REFERENCES public.usuarios(id_usuario),
    fecha_creacion timestamp DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion timestamp,
    activo boolean DEFAULT true
);

-- Empleados
CREATE TABLE public.empleados (
    id_empleado serial PRIMARY KEY,
    nombre_completo varchar(100) NOT NULL,
    dpi varchar(13) UNIQUE,
    telefono varchar(8),
    correo_personal varchar(100),
    direccion text,
    fecha_nacimiento date,
    genero varchar(15),
    estado_civil varchar(20),
    fecha_ingreso date NOT NULL,
    id_puesto integer REFERENCES public.puestos(id_puesto),
    estado_empleo varchar(20) DEFAULT 'Activo',
    creado_por integer REFERENCES public.usuarios(id_usuario),
    actualizado_por integer REFERENCES public.usuarios(id_usuario),
    fecha_creacion timestamp DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion timestamp,
    activo boolean DEFAULT true
);

-- Candidatos
CREATE TABLE public.candidatos (
    id_candidato serial PRIMARY KEY,
    nombre_completo varchar(100),
    correo varchar(100),
    telefono varchar(20),
    cv_url text,
    fecha_aplicacion date DEFAULT CURRENT_DATE,
    creado_por integer REFERENCES public.usuarios(id_usuario),
    fecha_creacion timestamp DEFAULT CURRENT_TIMESTAMP,
    activo boolean DEFAULT true
);

-- Vacantes
CREATE TABLE public.vacantes (
    id_vacante serial PRIMARY KEY,
    titulo varchar(100) NOT NULL,
    descripcion text,
    fecha_publicacion date NOT NULL,
    estado varchar(20) DEFAULT 'Abierta',
    id_puesto integer REFERENCES public.puestos(id_puesto),
    creado_por integer REFERENCES public.usuarios(id_usuario),
    actualizado_por integer REFERENCES public.usuarios(id_usuario),
    fecha_creacion timestamp DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion timestamp,
    activo boolean DEFAULT true
);

-- Aplicaciones
CREATE TABLE public.aplicaciones (
    id_aplicacion serial PRIMARY KEY,
    id_vacante integer REFERENCES public.vacantes(id_vacante),
    id_candidato integer REFERENCES public.candidatos(id_candidato),
    estado_aplicacion varchar(30) DEFAULT 'En revisión',
    observaciones text,
    fecha_aplicacion timestamp DEFAULT CURRENT_TIMESTAMP,
    creado_por integer REFERENCES public.usuarios(id_usuario),
    activo boolean DEFAULT true
);

-- Contratos
CREATE TABLE public.contratos (
    id_contrato serial PRIMARY KEY,
    id_empleado integer NOT NULL REFERENCES public.empleados(id_empleado),
    tipo_contrato varchar(50) NOT NULL,
    fecha_inicio date NOT NULL,
    fecha_fin date,
    observaciones text,
    creado_por integer REFERENCES public.usuarios(id_usuario),
    actualizado_por integer REFERENCES public.usuarios(id_usuario),
    fecha_creacion timestamp DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion timestamp,
    activo boolean DEFAULT true
);

-- Criterios
CREATE TABLE public.criterios (
    id_criterio serial PRIMARY KEY,
    nombre_criterio varchar(100) NOT NULL,
    descripcion text,
    creado_por integer REFERENCES public.usuarios(id_usuario),
    fecha_creacion timestamp DEFAULT CURRENT_TIMESTAMP,
    activo boolean DEFAULT true
);

-- Evaluaciones
CREATE TABLE public.evaluaciones (
    id_evaluacion serial PRIMARY KEY,
    id_empleado integer REFERENCES public.empleados(id_empleado),
    fecha_evaluacion date NOT NULL,
    evaluador varchar(100),
    comentarios text,
    puntuacion_total numeric(5,2),
    creado_por integer REFERENCES public.usuarios(id_usuario),
    fecha_creacion timestamp DEFAULT CURRENT_TIMESTAMP,
    activo boolean DEFAULT true
);

-- Detalle evaluación
CREATE TABLE public.detalle_evaluacion (
    id_detalle serial PRIMARY KEY,
    id_evaluacion integer REFERENCES public.evaluaciones(id_evaluacion),
    id_criterio integer REFERENCES public.criterios(id_criterio),
    puntuacion numeric(5,2),
    creado_por integer REFERENCES public.usuarios(id_usuario),
    fecha_creacion timestamp DEFAULT CURRENT_TIMESTAMP,
    activo boolean DEFAULT true,
    CONSTRAINT uc_evaluacion_criterio UNcIQUE (id_evaluacion, id_criterio)
);

-- Nómina
CREATE TABLE public.nomina (
    id_nomina serial PRIMARY KEY,
    id_empleado integer REFERENCES public.empleados(id_empleado),
    mes integer,
    anio integer,
    sueldo_bruto numeric(10,2),
    bonificaciones numeric(10,2),
    descuentos numeric(10,2),
    sueldo_neto numeric(10,2),
    fecha_generacion timestamp DEFAULT CURRENT_TIMESTAMP,
    creado_por integer REFERENCES public.usuarios(id_usuario),
    actualizado_por integer REFERENCES public.usuarios(id_usuario),
    fecha_actualizacion timestamp,
    activo boolean DEFAULT true
);

-- Vacaciones
CREATE TABLE public.vacaciones (
    id_vacacion serial PRIMARY KEY,
    id_empleado integer NOT NULL REFERENCES public.empleados(id_empleado),
    fecha_inicio date NOT NULL,
    fecha_fin date NOT NULL,
    estado varchar(20) DEFAULT 'Pendiente',
    creado_por integer REFERENCES public.usuarios(id_usuario),
    actualizado_por integer REFERENCES public.usuarios(id_usuario),
    fecha_creacion timestamp DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion timestamp,
    activo boolean DEFAULT true
);

-- Bienestar
CREATE TABLE public.bienestar (
    id_bienestar serial PRIMARY KEY,
    nombre_actividad varchar(100) NOT NULL,
    descripcion text,
    fecha_actividad date NOT NULL,
    creado_por integer REFERENCES public.usuarios(id_usuario),
    fecha_creacion timestamp DEFAULT CURRENT_TIMESTAMP,
    activo boolean DEFAULT true
);

-- Dependencias
CREATE TABLE public.dependencias (
    id_dependencia serial PRIMARY KEY,
    id_puesto_superior integer REFERENCES public.puestos(id_puesto),
    id_puesto_subordinado integer UNIQUE REFERENCES public.puestos(id_puesto)
);





=============================================================


-- =================================================================
-- FUNCIONES DE AUDITORÍA GENÉRICAS Y CORREGIDAS
-- =================================================================

-- FUNCIÓN PARA INSERTS
CREATE OR REPLACE FUNCTION fn_audit_insert()
RETURNS TRIGGER AS $$
DECLARE
    primary_key_column TEXT := TG_ARGV[0];
    primary_key_value TEXT;
    user_id INT;
BEGIN
    -- Obtener el valor de la clave primaria dinámicamente
    EXECUTE format('SELECT ($1).%I::TEXT', primary_key_column)
    INTO primary_key_value
    USING NEW;

    -- Intentar obtener el usuario de 'creado_por' (si existe)
    BEGIN
        user_id := NEW.creado_por;
    EXCEPTION WHEN UNDEFINED_COLUMN THEN
        user_id := NULL;
    END;

    INSERT INTO auditoria(tabla_afectada, id_registro_text, accion, usuario, descripcion)
    VALUES (TG_TABLE_NAME, primary_key_value, 'INSERT', user_id, 'Registro creado');

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


-- FUNCIÓN PARA UPDATES
CREATE OR REPLACE FUNCTION fn_audit_update()
RETURNS TRIGGER AS $$
DECLARE
    primary_key_column TEXT := TG_ARGV[0];
    primary_key_value TEXT;
    user_id INT;
    old_row JSONB;
    new_row JSONB;
    r RECORD;
BEGIN
    -- Obtener el valor de la clave primaria dinámicamente
    EXECUTE format('SELECT ($1).%I::TEXT', primary_key_column)
    INTO primary_key_value
    USING NEW;

    -- Intentar obtener el usuario de 'actualizado_por' (si existe)
    BEGIN
        user_id := NEW.actualizado_por;
    EXCEPTION WHEN UNDEFINED_COLUMN THEN
        user_id := NULL;
    END;

    -- Convertir filas a JSONB para iterar sobre los campos
    old_row := to_jsonb(OLD);
    new_row := to_jsonb(NEW);

    FOR r IN SELECT key, value FROM jsonb_each_text(new_row)
    LOOP
        -- Revisar si el valor del campo cambió
        IF r.value IS DISTINCT FROM (old_row ->> r.key) THEN
            -- Ignorar cambios en 'fecha_actualizacion' para evitar bucles o ruido
            IF r.key != 'fecha_actualizacion' THEN
                INSERT INTO auditoria(
                    tabla_afectada,
                    id_registro_text,
                    campo_modificado,
                    valor_anterior,
                    valor_nuevo,
                    accion,
                    usuario,
                    descripcion
                )
                VALUES (
                    TG_TABLE_NAME,
                    primary_key_value,
                    r.key,
                    (old_row ->> r.key),
                    r.value,
                    'UPDATE',
                    user_id,
                    'Campo actualizado'
                );
            END IF;
        END IF;
    END LOOP;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


-- FUNCIÓN PARA DELETES LÓGICOS (UPDATE de activo a false)
CREATE OR REPLACE FUNCTION fn_audit_delete_logico()
RETURNS TRIGGER AS $$
DECLARE
    primary_key_column TEXT := TG_ARGV[0];
    primary_key_value TEXT;
    user_id INT;
BEGIN
    -- Esta función solo se dispara si OLD.activo = true Y NEW.activo = false
    
    -- Obtener el valor de la clave primaria dinámicamente
    EXECUTE format('SELECT ($1).%I::TEXT', primary_key_column)
    INTO primary_key_value
    USING OLD;

    -- Intentar obtener el usuario de 'actualizado_por' (si existe)
    BEGIN
        user_id := NEW.actualizado_por;
    EXCEPTION WHEN UNDEFINED_COLUMN THEN
        user_id := NULL;
    END;

    INSERT INTO auditoria(tabla_afectada, id_registro_text, accion, usuario, descripcion)
    VALUES (TG_TABLE_NAME, primary_key_value, 'DELETE', user_id, 'Borrado lógico');

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


-- =================================================================
-- ELIMINACIÓN DE TRIGGERS ANTIGUOS (Opcional pero recomendado)
-- =================================================================
-- Es una buena práctica eliminar los triggers antiguos antes de crear los nuevos
-- para evitar duplicados o errores.
DROP TRIGGER IF EXISTS trg_empleados_insert ON empleados;
DROP TRIGGER IF EXISTS trg_empleados_update ON empleados;
DROP TRIGGER IF EXISTS trg_empleados_delete ON empleados;
DROP TRIGGER IF EXISTS trg_carreras_insert ON carreras;
DROP TRIGGER IF EXISTS trg_carreras_update ON carreras;
DROP TRIGGER IF EXISTS trg_carreras_delete ON carreras;
-- (etc. para todas las tablas)


-- =================================================================
-- CREACIÓN DE TRIGGERS CORREGIDOS
-- Se pasa el nombre de la columna de la clave primaria como argumento.
-- =================================================================

-- Empleados
CREATE TRIGGER trg_empleados_insert AFTER INSERT ON empleados FOR EACH ROW EXECUTE FUNCTION fn_audit_insert('id_empleado');
CREATE TRIGGER trg_empleados_update AFTER UPDATE ON empleados FOR EACH ROW EXECUTE FUNCTION fn_audit_update('id_empleado');
CREATE TRIGGER trg_empleados_delete AFTER UPDATE ON empleados FOR EACH ROW WHEN (OLD.activo IS DISTINCT FROM NEW.activo AND NEW.activo = false) EXECUTE FUNCTION fn_audit_delete_logico('id_empleado');

-- Carreras
CREATE TRIGGER trg_carreras_insert AFTER INSERT ON carreras FOR EACH ROW EXECUTE FUNCTION fn_audit_insert('id_carrera');
CREATE TRIGGER trg_carreras_update AFTER UPDATE ON carreras FOR EACH ROW EXECUTE FUNCTION fn_audit_update('id_carrera');
CREATE TRIGGER trg_carreras_delete AFTER UPDATE ON carreras FOR EACH ROW WHEN (OLD.activo IS DISTINCT FROM NEW.activo AND NEW.activo = false) EXECUTE FUNCTION fn_audit_delete_logico('id_carrera');

-- Puestos
CREATE TRIGGER trg_puestos_insert AFTER INSERT ON puestos FOR EACH ROW EXECUTE FUNCTION fn_audit_insert('id_puesto');
CREATE TRIGGER trg_puestos_update AFTER UPDATE ON puestos FOR EACH ROW EXECUTE FUNCTION fn_audit_update('id_puesto');
CREATE TRIGGER trg_puestos_delete AFTER UPDATE ON puestos FOR EACH ROW WHEN (OLD.activo IS DISTINCT FROM NEW.activo AND NEW.activo = false) EXECUTE FUNCTION fn_audit_delete_logico('id_puesto');

-- Candidatos
CREATE TRIGGER trg_candidatos_insert AFTER INSERT ON candidatos FOR EACH ROW EXECUTE FUNCTION fn_audit_insert('id_candidato');
CREATE TRIGGER trg_candidatos_update AFTER UPDATE ON candidatos FOR EACH ROW EXECUTE FUNCTION fn_audit_update('id_candidato');
CREATE TRIGGER trg_candidatos_delete AFTER UPDATE ON candidatos FOR EACH ROW WHEN (OLD.activo IS DISTINCT FROM NEW.activo AND NEW.activo = false) EXECUTE FUNCTION fn_audit_delete_logico('id_candidato');

-- Vacantes
CREATE TRIGGER trg_vacantes_insert AFTER INSERT ON vacantes FOR EACH ROW EXECUTE FUNCTION fn_audit_insert('id_vacante');
CREATE TRIGGER trg_vacantes_update AFTER UPDATE ON vacantes FOR EACH ROW EXECUTE FUNCTION fn_audit_update('id_vacante');
CREATE TRIGGER trg_vacantes_delete AFTER UPDATE ON vacantes FOR EACH ROW WHEN (OLD.activo IS DISTINCT FROM NEW.activo AND NEW.activo = false) EXECUTE FUNCTION fn_audit_delete_logico('id_vacante');

-- Aplicaciones
CREATE TRIGGER trg_aplicaciones_insert AFTER INSERT ON aplicaciones FOR EACH ROW EXECUTE FUNCTION fn_audit_insert('id_aplicacion');
CREATE TRIGGER trg_aplicaciones_update AFTER UPDATE ON aplicaciones FOR EACH ROW EXECUTE FUNCTION fn_audit_update('id_aplicacion');
CREATE TRIGGER trg_aplicaciones_delete AFTER UPDATE ON aplicaciones FOR EACH ROW WHEN (OLD.activo IS DISTINCT FROM NEW.activo AND NEW.activo = false) EXECUTE FUNCTION fn_audit_delete_logico('id_aplicacion');

-- Contratos
CREATE TRIGGER trg_contratos_insert AFTER INSERT ON contratos FOR EACH ROW EXECUTE FUNCTION fn_audit_insert('id_contrato');
CREATE TRIGGER trg_contratos_update AFTER UPDATE ON contratos FOR EACH ROW EXECUTE FUNCTION fn_audit_update('id_contrato');
CREATE TRIGGER trg_contratos_delete AFTER UPDATE ON contratos FOR EACH ROW WHEN (OLD.activo IS DISTINCT FROM NEW.activo AND NEW.activo = false) EXECUTE FUNCTION fn_audit_delete_logico('id_contrato');

-- Criterios
CREATE TRIGGER trg_criterios_insert AFTER INSERT ON criterios FOR EACH ROW EXECUTE FUNCTION fn_audit_insert('id_criterio');
CREATE TRIGGER trg_criterios_update AFTER UPDATE ON criterios FOR EACH ROW EXECUTE FUNCTION fn_audit_update('id_criterio');
CREATE TRIGGER trg_criterios_delete AFTER UPDATE ON criterios FOR EACH ROW WHEN (OLD.activo IS DISTINCT FROM NEW.activo AND NEW.activo = false) EXECUTE FUNCTION fn_audit_delete_logico('id_criterio');

-- Evaluaciones
CREATE TRIGGER trg_evaluaciones_insert AFTER INSERT ON evaluaciones FOR EACH ROW EXECUTE FUNCTION fn_audit_insert('id_evaluacion');
CREATE TRIGGER trg_evaluaciones_update AFTER UPDATE ON evaluaciones FOR EACH ROW EXECUTE FUNCTION fn_audit_update('id_evaluacion');
CREATE TRIGGER trg_evaluaciones_delete AFTER UPDATE ON evaluaciones FOR EACH ROW WHEN (OLD.activo IS DISTINCT FROM NEW.activo AND NEW.activo = false) EXECUTE FUNCTION fn_audit_delete_logico('id_evaluacion');

-- Detalle evaluación
CREATE TRIGGER trg_detalle_evaluacion_insert AFTER INSERT ON detalle_evaluacion FOR EACH ROW EXECUTE FUNCTION fn_audit_insert('id_detalle');
CREATE TRIGGER trg_detalle_evaluacion_update AFTER UPDATE ON detalle_evaluacion FOR EACH ROW EXECUTE FUNCTION fn_audit_update('id_detalle');
CREATE TRIGGER trg_detalle_evaluacion_delete AFTER UPDATE ON detalle_evaluacion FOR EACH ROW WHEN (OLD.activo IS DISTINCT FROM NEW.activo AND NEW.activo = false) EXECUTE FUNCTION fn_audit_delete_logico('id_detalle');

-- Nómina
CREATE TRIGGER trg_nomina_insert AFTER INSERT ON nomina FOR EACH ROW EXECUTE FUNCTION fn_audit_insert('id_nomina');
CREATE TRIGGER trg_nomina_update AFTER UPDATE ON nomina FOR EACH ROW EXECUTE FUNCTION fn_audit_update('id_nomina');
CREATE TRIGGER trg_nomina_delete AFTER UPDATE ON nomina FOR EACH ROW WHEN (OLD.activo IS DISTINCT FROM NEW.activo AND NEW.activo = false) EXECUTE FUNCTION fn_audit_delete_logico('id_nomina');

-- Vacaciones
CREATE TRIGGER trg_vacaciones_insert AFTER INSERT ON vacaciones FOR EACH ROW EXECUTE FUNCTION fn_audit_insert('id_vacacion');
CREATE TRIGGER trg_vacaciones_update AFTER UPDATE ON vacaciones FOR EACH ROW EXECUTE FUNCTION fn_audit_update('id_vacacion');
CREATE TRIGGER trg_vacaciones_delete AFTER UPDATE ON vacaciones FOR EACH ROW WHEN (OLD.activo IS DISTINCT FROM NEW.activo AND NEW.activo = false) EXECUTE FUNCTION fn_audit_delete_logico('id_vacacion');

-- Bienestar
CREATE TRIGGER trg_bienestar_insert AFTER INSERT ON bienestar FOR EACH ROW EXECUTE FUNCTION fn_audit_insert('id_bienestar');
CREATE TRIGGER trg_bienestar_update AFTER UPDATE ON bienestar FOR EACH ROW EXECUTE FUNCTION fn_audit_update('id_bienestar');
CREATE TRIGGER trg_bienestar_delete AFTER UPDATE ON bienestar FOR EACH ROW WHEN (OLD.activo IS DISTINCT FROM NEW.activo AND NEW.activo = false) EXECUTE FUNCTION fn_audit_delete_logico('id_bienestar');
