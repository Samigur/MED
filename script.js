document.addEventListener('DOMContentLoaded', function() {
            // Establecer fecha actual por defecto
            const today = new Date().toISOString().split('T')[0];
            document.getElementById('visitDate').value = today;
            
            // Actualizar vista previa con datos del formulario
            function updatePreview() {
                document.getElementById('previewInstitution').textContent = 
                    document.getElementById('institutionName').value || '[Nombre de la Institución]';
                document.getElementById('previewAddress').textContent = 
                    document.getElementById('institutionAddress').value || '[Dirección de la Institución]';
                document.getElementById('previewDate').textContent = 
                    document.getElementById('visitDate').value || '[Fecha de Visita]';
                document.getElementById('previewVisitor').textContent = 
                    document.getElementById('visitorName').value || '[Nombre del Visitante]';
                document.getElementById('previewPosition').textContent = 
                    document.getElementById('visitorPosition').value || '[Cargo del Visitante]';
                document.getElementById('previewVisitorName').textContent = 
                    document.getElementById('visitorName').value || '[Nombre del Visitante]';
                document.getElementById('previewVisitorPosition').textContent = 
                    document.getElementById('visitorPosition').value || '[Cargo del Visitante]';
                document.getElementById('previewRectorName').textContent = 
                    document.getElementById('rectorName').value || '[Nombre del Rector]';
                
                // Fechas de firma (usar fecha actual)
                const currentDate = new Date().toLocaleDateString('es-ES');
                document.getElementById('previewVisitorDate').textContent = currentDate;
                document.getElementById('previewRectorDate').textContent = currentDate;
            }
            
            // Configuración de los canvas para dibujar
            const canvas1 = document.getElementById('signatureCanvas1');
            const canvas2 = document.getElementById('signatureCanvas2');
            const ctx1 = canvas1.getContext('2d');
            const ctx2 = canvas2.getContext('2d');
            
            // Variables para el dibujo
            let isDrawing1 = false;
            let isDrawing2 = false;
            let lastX1, lastY1;
            let lastX2, lastY2;
            
            // Configurar canvas 1
            function setupCanvas1() {
                ctx1.lineWidth = 2;
                ctx1.lineJoin = 'round';
                ctx1.lineCap = 'round';
                ctx1.strokeStyle = '#000';
                
                canvas1.addEventListener('mousedown', startDrawing1);
                canvas1.addEventListener('mousemove', draw1);
                canvas1.addEventListener('mouseup', stopDrawing1);
                canvas1.addEventListener('mouseout', stopDrawing1);
                
                // Soporte para dispositivos táctiles
                canvas1.addEventListener('touchstart', startDrawingTouch1);
                canvas1.addEventListener('touchmove', drawTouch1);
                canvas1.addEventListener('touchend', stopDrawing1);
            }
            
            // Configurar canvas 2
            function setupCanvas2() {
                ctx2.lineWidth = 2;
                ctx2.lineJoin = 'round';
                ctx2.lineCap = 'round';
                ctx2.strokeStyle = '#000';
                
                canvas2.addEventListener('mousedown', startDrawing2);
                canvas2.addEventListener('mousemove', draw2);
                canvas2.addEventListener('mouseup', stopDrawing2);
                canvas2.addEventListener('mouseout', stopDrawing2);
                
                // Soporte para dispositivos táctiles
                canvas2.addEventListener('touchstart', startDrawingTouch2);
                canvas2.addEventListener('touchmove', drawTouch2);
                canvas2.addEventListener('touchend', stopDrawing2);
            }
            
            // Funciones para el canvas 1
            function startDrawing1(e) {
                isDrawing1 = true;
                [lastX1, lastY1] = [e.offsetX, e.offsetY];
            }
            
            function startDrawingTouch1(e) {
                e.preventDefault();
                isDrawing1 = true;
                const rect = canvas1.getBoundingClientRect();
                const touch = e.touches[0];
                [lastX1, lastY1] = [touch.clientX - rect.left, touch.clientY - rect.top];
            }
            
            function draw1(e) {
                if (!isDrawing1) return;
                ctx1.beginPath();
                ctx1.moveTo(lastX1, lastY1);
                ctx1.lineTo(e.offsetX, e.offsetY);
                ctx1.stroke();
                [lastX1, lastY1] = [e.offsetX, e.offsetY];
            }
            
            function drawTouch1(e) {
                if (!isDrawing1) return;
                e.preventDefault();
                const rect = canvas1.getBoundingClientRect();
                const touch = e.touches[0];
                ctx1.beginPath();
                ctx1.moveTo(lastX1, lastY1);
                ctx1.lineTo(touch.clientX - rect.left, touch.clientY - rect.top);
                ctx1.stroke();
                [lastX1, lastY1] = [touch.clientX - rect.left, touch.clientY - rect.top];
            }
            
            function stopDrawing1() {
                isDrawing1 = false;
            }
            
            // Funciones para el canvas 2
            function startDrawing2(e) {
                isDrawing2 = true;
                [lastX2, lastY2] = [e.offsetX, e.offsetY];
            }
            
            function startDrawingTouch2(e) {
                e.preventDefault();
                isDrawing2 = true;
                const rect = canvas2.getBoundingClientRect();
                const touch = e.touches[0];
                [lastX2, lastY2] = [touch.clientX - rect.left, touch.clientY - rect.top];
            }
            
            function draw2(e) {
                if (!isDrawing2) return;
                ctx2.beginPath();
                ctx2.moveTo(lastX2, lastY2);
                ctx2.lineTo(e.offsetX, e.offsetY);
                ctx2.stroke();
                [lastX2, lastY2] = [e.offsetX, e.offsetY];
            }
            
            function drawTouch2(e) {
                if (!isDrawing2) return;
                e.preventDefault();
                const rect = canvas2.getBoundingClientRect();
                const touch = e.touches[0];
                ctx2.beginPath();
                ctx2.moveTo(lastX2, lastY2);
                ctx2.lineTo(touch.clientX - rect.left, touch.clientY - rect.top);
                ctx2.stroke();
                [lastX2, lastY2] = [touch.clientX - rect.left, touch.clientY - rect.top];
            }
            
            function stopDrawing2() {
                isDrawing2 = false;
            }
            
            // Limpiar canvas
            document.getElementById('clearCanvas1').addEventListener('click', function() {
                ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
            });
            
            document.getElementById('clearCanvas2').addEventListener('click', function() {
                ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
            });
            
            // Guardar firmas del canvas
            document.getElementById('saveCanvas1').addEventListener('click', function() {
                const dataURL = canvas1.toDataURL('image/png');
                displaySignature(1, dataURL);
                showStatus('Firma del visitante guardada correctamente', 'success');
            });
            
            document.getElementById('saveCanvas2').addEventListener('click', function() {
                const dataURL = canvas2.toDataURL('image/png');
                displaySignature(2, dataURL);
                showStatus('Firma del rector guardada correctamente', 'success');
            });
            
            // Subir archivos de firma
            document.getElementById('uploadArea1').addEventListener('click', function() {
                document.getElementById('fileInput1').click();
            });
            
            document.getElementById('uploadArea2').addEventListener('click', function() {
                document.getElementById('fileInput2').click();
            });
            
            document.getElementById('fileInput1').addEventListener('change', function(e) {
                if (e.target.files && e.target.files[0]) {
                    const reader = new FileReader();
                    reader.onload = function(event) {
                        displaySignature(1, event.target.result);
                        showStatus('Firma del visitante cargada correctamente', 'success');
                    };
                    reader.readAsDataURL(e.target.files[0]);
                }
            });
            
            document.getElementById('fileInput2').addEventListener('change', function(e) {
                if (e.target.files && e.target.files[0]) {
                    const reader = new FileReader();
                    reader.onload = function(event) {
                        displaySignature(2, event.target.result);
                        showStatus('Firma del rector cargada correctamente', 'success');
                    };
                    reader.readAsDataURL(e.target.files[0]);
                }
            });
            
            // Mostrar firmas en el documento
            function displaySignature(signatureNumber, dataURL) {
                const previewElement = document.getElementById(`preview${signatureNumber}`);
                const placeholderElement = document.getElementById(`signaturePlaceholder${signatureNumber}`);
                
                previewElement.innerHTML = `<img src="${dataURL}" alt="Firma ${signatureNumber}">`;
                placeholderElement.innerHTML = `<img src="${dataURL}" alt="Firma ${signatureNumber}" style="max-height: 100%; max-width: 100%;">`;
                
                // Guardar en localStorage para persistencia
                localStorage.setItem(`signature${signatureNumber}`, dataURL);
            }
            
            // Cargar firmas guardadas (si existen)
            function loadSavedSignatures() {
                const savedSignature1 = localStorage.getItem('signature1');
                const savedSignature2 = localStorage.getItem('signature2');
                
                if (savedSignature1) {
                    displaySignature(1, savedSignature1);
                }
                
                if (savedSignature2) {
                    displaySignature(2, savedSignature2);
                }
            }
            
            // Cargar plantilla existente
            document.getElementById('loadTemplate').addEventListener('click', function() {
                document.getElementById('templateInput').click();
            });
            
            document.getElementById('templateInput').addEventListener('change', function(e) {
                if (e.target.files && e.target.files[0]) {
                    const file = e.target.files[0];
                    const fileName = file.name.toLowerCase();
                    
                    if (fileName.endsWith('.pdf')) {
                        showStatus('Plantilla PDF cargada. Las firmas se agregarán al generar el documento.', 'success');
                    } else if (fileName.endsWith('.doc') || fileName.endsWith('.docx')) {
                        showStatus('Plantilla Word cargada. Para una integración completa, se recomienda convertir a PDF primero.', 'success');
                    } else {
                        showStatus('Formato de archivo no compatible. Use PDF o Word.', 'error');
                    }
                    
                    // Aquí normalmente procesarías el archivo cargado
                    // Para esta demo, solo mostramos un mensaje
                }
            });
            
            // Generar PDF
            document.getElementById('generatePDF').addEventListener('click', function() {
                // Validar que se hayan completado los datos necesarios
                if (!document.getElementById('institutionName').value || 
                    !document.getElementById('visitorName').value || 
                    !document.getElementById('rectorName').value) {
                    showStatus('Por favor, complete todos los campos obligatorios antes de generar el PDF.', 'error');
                    return;
                }
                
                const savedSignature1 = localStorage.getItem('signature1');
                const savedSignature2 = localStorage.getItem('signature2');
                
                if (!savedSignature1 || !savedSignature2) {
                    showStatus('Ambas firmas son necesarias para generar el documento.', 'error');
                    return;
                }
                
                const { jsPDF } = window.jspdf;
                const doc = new jsPDF();
                
                // Agregar contenido al PDF
                const documentPreview = document.getElementById('documentPreview');
                
                // Actualizar vista previa antes de generar PDF
                updatePreview();
                
                html2canvas(documentPreview).then(canvas => {
                    const imgData = canvas.toDataURL('image/png');
                    const imgWidth = doc.internal.pageSize.getWidth();
                    const imgHeight = (canvas.height * imgWidth) / canvas.width;
                    
                    doc.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
                    doc.save(`acta_visita_${document.getElementById('institutionName').value.replace(/\s+/g, '_')}.pdf`);
                    showStatus('Documento generado y descargado correctamente', 'success');
                });
            });
            
            // Reiniciar todo
            document.getElementById('resetAll').addEventListener('click', function() {
                if (confirm('¿Estás seguro de que quieres reiniciar todo? Se perderán todos los datos y firmas guardadas.')) {
                    // Limpiar formularios
                    document.getElementById('institutionName').value = '';
                    document.getElementById('visitDate').value = today;
                    document.getElementById('visitorName').value = '';
                    document.getElementById('visitorPosition').value = '';
                    document.getElementById('rectorName').value = '';
                    document.getElementById('institutionAddress').value = '';
                    
                    // Limpiar canvas
                    ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
                    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
                    
                    // Limpiar vistas previas
                    document.getElementById('preview1').innerHTML = '<p>Vista previa Firma Visitante</p>';
                    document.getElementById('preview2').innerHTML = '<p>Vista previa Firma Rector</p>';
                    
                    document.getElementById('signaturePlaceholder1').innerHTML = '<p>Firma Visitante aparecerá aquí</p>';
                    document.getElementById('signaturePlaceholder2').innerHTML = '<p>Firma Rector aparecerá aquí</p>';
                    
                    // Limpiar localStorage
                    localStorage.removeItem('signature1');
                    localStorage.removeItem('signature2');
                    
                    // Limpiar inputs de archivo
                    document.getElementById('fileInput1').value = '';
                    document.getElementById('fileInput2').value = '';
                    document.getElementById('templateInput').value = '';
                    
                    // Actualizar vista previa
                    updatePreview();
                    
                    showStatus('Todos los datos han sido reiniciados', 'success');
                }
            });
            
            // Mostrar mensajes de estado
            function showStatus(message, type) {
                const statusElement = document.getElementById('statusMessage');
                statusElement.textContent = message;
                statusElement.className = 'status-message';
                
                if (type === 'success') {
                    statusElement.classList.add('status-success');
                } else if (type === 'error') {
                    statusElement.classList.add('status-error');
                }
                
                statusElement.classList.remove('hidden');
                
                // Ocultar después de 5 segundos
                setTimeout(() => {
                    statusElement.classList.add('hidden');
                }, 5000);
            }
            
            // Actualizar vista previa cuando cambien los campos del formulario
            const formInputs = document.querySelectorAll('input, select');
            formInputs.forEach(input => {
                input.addEventListener('input', updatePreview);
            });
            
            // Inicializar
            setupCanvas1();
            setupCanvas2();
            loadSavedSignatures();
            updatePreview();
        });